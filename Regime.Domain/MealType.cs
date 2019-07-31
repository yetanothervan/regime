using System;

namespace Regime.Domain
{
    public class MealType
    {
        public Guid Id { get; set; }
        public string Caption { get; set; }
        public decimal KkalTotal { get; set; }
        public decimal ProteinPart { get; set; }
        public decimal FatPart { get; set; }
        public decimal CarbonPart { get; set; }
    }
}