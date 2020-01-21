using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.Aggregates;

namespace Infrastructure.Interfaces
{
    public interface IIngredientsManager
    {
        Ingredient UpdateIngredient(Ingredient ingredient);
    }
}
