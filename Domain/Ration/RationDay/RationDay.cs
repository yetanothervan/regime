using System;
using System.Collections.Generic;
using Domain.SharedKernel;

namespace Domain.Ration.RationDay
{
    public class RationDay : Entity, IAggregationRoot
    {
        public RationDay(Guid id) : base(id)
        {
        }

        public string Caption { get; set; }
        
        public decimal TotalKkal { get; set; }

        public List<Meal> Meals { get; set; }
    }
}
