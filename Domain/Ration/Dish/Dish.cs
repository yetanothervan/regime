using System;
using System.Collections.Generic;
using System.Text;
using Domain.SharedKernel;

namespace Domain.Ration.Dish
{
    public class Dish : Entity, IAggregationRoot
    {
        public Dish(Guid id) : base(id)
        {
            Items = new List<DishItem>();
        }

        public List<DishItem> Items { get; set; }
        public string Caption { get; set; }
        public string Comment { get; set; }
    }
}
