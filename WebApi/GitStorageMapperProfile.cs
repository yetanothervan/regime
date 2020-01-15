using AutoMapper;
using Domain.Ration.Aggregates;
using Domain.Ration.Entities;

namespace WebApi
{
    public class GitStorageMapperProfile : Profile
    {

        public GitStorageMapperProfile()
        {
            CreateMap<RationDay, Infrastructure.Dtos.RationDay>();
            CreateMap<Ingredient, Infrastructure.Dtos.Ingredient>();
        }
    }
}