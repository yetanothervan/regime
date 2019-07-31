using System;

namespace Regime.Domain
{
    public class MealItem
    {
        public Guid DishId { get; set; }
        public decimal Portion { get; set; }
    }
}