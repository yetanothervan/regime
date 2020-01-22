using System;
using System.Collections.Generic;
using System.Text;
using Domain.SharedKernel;

namespace Domain.Ration.Dish
{
    public class DishItem : ValueObject<DishItem>
    {
        public DishItem(Guid ingredientId, decimal weight)
        {
            IngredientId = ingredientId;
            Weight = weight;
        }
        public Guid IngredientId { get; }
        public decimal Weight { get; }
        protected override IEnumerable<object> GetAttributesToIncludeInEqualityCheck()
        {
            return new object[] {IngredientId, Weight};
        }
    }
}
