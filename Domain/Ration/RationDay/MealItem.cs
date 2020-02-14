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

        public Guid DishId { get; set; }
        public decimal Weight { get; set; }
    }
}
