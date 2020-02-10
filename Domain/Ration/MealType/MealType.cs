using System;
using System.Collections.Generic;
using System.Text;
using Domain.SharedKernel;

namespace Domain.Ration.MealType
{
    public class MealType: Entity, IAggregationRoot
    {
        public MealType(Guid id) : base(id)
        {
        }

        public string Caption { get; set; }
        public decimal KkalTotal { get; set; }
        public decimal ProteinPart { get; set; }
        public decimal FatPart { get; set; }
        public decimal CarbonPart { get; set; }
    }
}
