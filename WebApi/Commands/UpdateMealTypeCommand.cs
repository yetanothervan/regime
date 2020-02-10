using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Dtos;
using MediatR;

namespace WebApi.Commands
{
    public class UpdateMealTypeCommand : IRequest<MealType>
    {
        public MealType MealType { get; }

        public UpdateMealTypeCommand(MealType mealType)
        {
            MealType = mealType;
        }
    }
}
