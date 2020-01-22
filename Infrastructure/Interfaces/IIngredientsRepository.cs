using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.Ingredient;

namespace Infrastructure.Interfaces
{
    public interface IIngredientsRepository
    {
        IReadOnlyList<Ingredient> GetIngredients();
    }
}
