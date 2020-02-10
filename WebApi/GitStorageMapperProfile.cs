using AutoMapper;
using Domain.Ration.Dish;
using Domain.Ration.Ingredient;
using Domain.Ration.MealType;
using Domain.Ration.RationDay;

namespace WebApi
{
    public class GitStorageMapperProfile : Profile
    {

        public GitStorageMapperProfile()
        {
            CreateMap<MealItem, Infrastructure.Dtos.MealItem>().ReverseMap();
            CreateMap<MealType, Infrastructure.Dtos.MealType>().ReverseMap();
            CreateMap<Meal, Infrastructure.Dtos.Meal>().ReverseMap();
            CreateMap<RationDay, Infrastructure.Dtos.RationDay>().ReverseMap();
            CreateMap<Ingredient, Infrastructure.Dtos.Ingredient>().ReverseMap();
            CreateMap<DishItem, Infrastructure.Dtos.DishItem>().ReverseMap();
            CreateMap<Dish, Infrastructure.Dtos.Dish>().ReverseMap();
        }
    }
}