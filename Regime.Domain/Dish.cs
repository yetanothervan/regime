using System;
using System.Collections.Generic;

namespace Regime.Domain
{
    public class Dish
    {
        public Dish()
        {
            Items = new List<DishItem>();
        }
        public List<DishItem> Items { get; set; }
        public string Caption { get; set; }
        public Guid Id { get; set; }
    }
}