using AutoMapper;
using Insurance.Models;
using Insurance.Models.Dto;

namespace Insurance.Profiles;

public class PolicyProfile : Profile
{
    public PolicyProfile()
    {
        CreateMap<PolicyRequestDto, Policy>().ReverseMap();
    }
}