using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
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
