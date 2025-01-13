using System.Security.Claims;
using AutoMapper;
using Insurance.Models;
using Insurance.Models.Dto;
using Insurance.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Insurance.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class PolicyController : ControllerBase
{
    private readonly IMapper _mapper;
    private readonly IPolicyService _policyService;
    private readonly IHttpContextAccessor _httpContextAccessor;
    
    public PolicyController(IMapper mapper, IPolicyService policyService, IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _policyService = policyService;
        _httpContextAccessor = httpContextAccessor;

    }
    
    [HttpGet]
    public async Task<ActionResult<ResponseDto>> GetAllPolicies()
    {
        try
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            var policies = await _policyService.GetAllPoliciesByUserAsync(userId); 
            return Ok(new ResponseDto {Result = policies});
        }
        catch (Exception ex)
        {
            return GetServerError(ex);
        }
    }

    [HttpPost]
    public async Task<ActionResult<ResponseDto>> AddPolicy(PolicyRequestDto policyRequestDto)
    {
        try
        {
            var newPolicy = _mapper.Map<Policy>(policyRequestDto);
            newPolicy.UserId = _httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            var response = await _policyService.CreatePolicyAsync(newPolicy);

            return Ok(new ResponseDto{Result = response});
        }
        catch (Exception ex)
        {
            return GetServerError(ex);
        } 
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<ResponseDto>> GetPolicy(Guid id)
    {
        try
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            var policy = await _policyService.GetPolicyByIdAsync(id);
            if (policy == null || policy.UserId != userId)
            {
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Policy not found"
                });
            }

            return Ok(policy);
        }
        catch (Exception ex)
        {
            return GetServerError(ex);
        }
    }
    
    [HttpPut("{id}")]
    public async Task<ActionResult<ResponseDto>> UpdatePolicy(Guid id, PolicyRequestDto policyRequestDto)
    {
        try
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            var existingPolicy = await _policyService.GetPolicyByIdAsync(id);
            if (existingPolicy == null || !existingPolicy.UserId.Equals(userId))
            {
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Policy not found"
                });
            }

            var updatedPolicy = _mapper.Map(policyRequestDto, existingPolicy);
            var response = await _policyService.UpdatePolicyAsync(updatedPolicy);

            return Ok(new ResponseDto{Result = response});
        }
        catch (Exception ex)
        {
            return GetServerError(ex);
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<ResponseDto>> DeletePolicy(Guid id)
    {
        try
        {
            var userId = _httpContextAccessor.HttpContext.User.Claims
                .FirstOrDefault(c => c.Type.Equals(ClaimTypes.NameIdentifier))?.Value;
            var existingPolicy = await _policyService.GetPolicyByIdAsync(id);
            if (existingPolicy == null || !existingPolicy.UserId.Equals(userId))
            {
                return NotFound(new ResponseDto
                {
                    IsSuccess = false,
                    Message = "Policy not found"
                });
            }

            await _policyService.DeletePolicyAsync(existingPolicy);
            return new NoContentResult();
        }
        catch (Exception ex)
        {
            return GetServerError(ex);
        }
    }

    private ActionResult<ResponseDto> GetServerError(Exception ex)
    {
        return StatusCode(500, new ResponseDto
        {
            IsSuccess = false,
            Message = ex.Message
        });
    } 
}
    