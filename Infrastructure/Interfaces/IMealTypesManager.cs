using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.MealType;

namespace Infrastructure.Interfaces
{
    public interface IMealTypesManager
    {
        MealType UpdateMealType(MealType mealType);
        string DeleteMealType(Guid id);
    }
}
