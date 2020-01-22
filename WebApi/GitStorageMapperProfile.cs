using AutoMapper;
using Domain.Ration.Dish;
using Domain.Ration.Ingredient;
using Domain.Ration.RationDay;

namespace WebApi
{
    public class GitStorageMapperProfile : Profile
    {

        public GitStorageMapperProfile()
        {
            CreateMap<RationDay, Infrastructure.Dtos.RationDay>().ReverseMap();
            CreateMap<Ingredient, Infrastructure.Dtos.Ingredient>().ReverseMap();
            CreateMap<DishItem, Infrastructure.Dtos.DishItem>().ReverseMap();
            CreateMap<Dish, Infrastructure.Dtos.Dish>().ReverseMap();
        }
    }
}