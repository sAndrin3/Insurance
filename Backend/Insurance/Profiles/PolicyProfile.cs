using AutoMapper;
using Insurance.Models;
using Insurance.Models.Dto;

namespace Insurance.Profiles;

public class ProductProfile : Profile
{
    public ProductProfile()
    {
        CreateMap<PolicyRequestDto, Policy>().ReverseMap();
    }
}