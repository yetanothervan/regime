using System;
using System.Collections.Generic;

namespace Regime.Domain
{
    public class Meal
    {
        public Guid MealTypeId { get; set; } 
        public Meal()
        {
            Items = new List<MealItem>();
        }
        public Guid PersonId { get; set; }
        public List<MealItem> Items { get; set; }
    }
}