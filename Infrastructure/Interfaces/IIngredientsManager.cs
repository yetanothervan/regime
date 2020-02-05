using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.Ingredient;

namespace Infrastructure.Interfaces
{
    public interface IIngredientsManager
    {
        Ingredient UpdateIngredient(Ingredient ingredient);
        string DeleteIngredient(Guid id);
    }
}
