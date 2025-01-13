using AutoMapper;
using Insurance.Models;
using Insurance.Models.Dto;
using Insurance.Service.IService;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Controller;

[Route("api/[controller]")]
[ApiController]
public class PolicyController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPolicyInterface _policyInterface;
    private readonly ResponseDto _responseDto;
    
    public PolicyController(IMapper mapper, IPolicyInterface policyInterface)
    {
        _mapper = mapper;
        _policyInterface = policyInterface;
        _responseDto = new ResponseDto();
    }
    
    [HttpGet]
    public async Task<ActionResult<ResponseDto>> GetAllPolicies()
    {
        try
        {
            var policy = await _policyInterface.GetAllpoliciesAsync();
            if (policy == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Error Occurred";
                return BadRequest(_responseDto);
            }

            _responseDto.Result = policy;
        }
        catch (Exception ex)
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = ex.Message;
            return BadRequest(_responseDto);
        }

        return Ok(_responseDto);
    }

    [HttpPost]
    public async Task<ActionResult<ResponseDto>> AddPolicy(PolicyRequestDto policyRequestDto)
    {
        try
        {
            var newPolicy = _mapper.Map<Policy>(policyRequestDto);
            var response = await _policyInterface.CreatePolicyAsync(newPolicy);

            if (string.IsNullOrEmpty(response))
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Error Occurred";
                return BadRequest(_responseDto);
            }

            _responseDto.Result = response;
        }
        catch (Exception ex)
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = ex.Message;
            return BadRequest(_responseDto);
        }

        return Ok(_responseDto);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ResponseDto>> GetPolicy(Guid id)
    {
        try
        {
            var policy = await _policyInterface.GetPolicyByIdAsync(id);
            if (policy == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Policy not found";
                return NotFound(_responseDto);
            }
        }
        catch (Exception ex)
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = ex.Message;
            return BadRequest(_responseDto);
        }

        return Ok(_responseDto);
    }
    
    [HttpPut("{id}")]
    [Authorize]

    public async Task<ActionResult<ResponseDto>> UpdatePolicy(Guid id, PolicyRequestDto policyRequestDto)
    {
        try
        {
            var existingPolicy = await _policyInterface.GetPolicyByIdAsync(id);
            if (existingPolicy == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Comment not found";
                return NotFound(_responseDto);
            }

            var updatedPolicy = _mapper.Map(policyRequestDto, existingPolicy);
            var response = await _policyInterface.UpdatePolicyAsync(updatedPolicy);

            _responseDto.Result = response;
        }
        catch (Exception ex)
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = ex.Message;
            return BadRequest(_responseDto);
        }

        return Ok(_responseDto);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<ResponseDto>> DeletePolicy(Guid id)
    {
        try
        {
            var policy = await _policyInterface.GetPolicyByIdAsync(id);
            if (policy == null)
            {
                _responseDto.IsSuccess = false;
                _responseDto.Message = "Policy not found";
                return NotFound(_responseDto);
            }

            var response = await _policyInterface.DeletePolicyAsync(policy);
            _responseDto.Result = response;
        }
        catch (Exception ex)
        {
            _responseDto.IsSuccess = false;
            _responseDto.Message = ex.Message;
            return BadRequest(_responseDto);
        }

        return Ok(_responseDto);
    }
}
    