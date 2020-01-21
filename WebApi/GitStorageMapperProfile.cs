using AutoMapper;
using Domain.Ration.Aggregates;

namespace WebApi
{
    public class GitStorageMapperProfile : Profile
    {

        public GitStorageMapperProfile()
        {
            CreateMap<RationDay, Infrastructure.Dtos.RationDay>().ReverseMap();
            CreateMap<Ingredient, Infrastructure.Dtos.Ingredient>().ReverseMap();
        }
    }
}