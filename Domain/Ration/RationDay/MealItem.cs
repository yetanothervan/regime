using System;
using System.Collections.Generic;
using System.Text;
using Domain.SharedKernel;

namespace Domain.Ration.RationDay
{
    public class MealItem : Entity
    {
        public MealItem(Guid id) : base(id)
        {
        }

        public Dish.Dish Dish { get; set; }
        public decimal Weight { get; set; }
    }
}
