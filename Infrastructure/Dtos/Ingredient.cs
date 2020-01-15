using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
    public class Ingredient
    {
        public string Caption { get; set; }
        public decimal Kkal100 { get; set; }
        public decimal Protein100 { get; set; }
        public decimal Fat100 { get; set; }
        public decimal Carbon100 { get; set; }
        public Guid Id { get; set; }
        public string Comment { get; set; }
    }
}