using System;
using System.Collections.Generic;
using System.Text;
using Domain.SharedKernel;

namespace Domain.Ration.RationDay
{
    public class Meal : Entity
    {
        public Meal(Guid id) : base(id)
        {
        }

        public MealType.MealType MealType { get; set; }

        public List<MealItem> MealItems { get; set; }
    }
}
