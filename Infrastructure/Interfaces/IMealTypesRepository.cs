using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.MealType;

namespace Infrastructure.Interfaces
{
    public interface IMealTypesRepository
    {
        List<MealType> GetMealTypes();
    }
}
