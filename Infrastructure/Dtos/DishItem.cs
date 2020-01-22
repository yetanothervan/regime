using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
    public class DishItem
    {
        public Guid IngredientId { get; set; }
        public decimal Weight { get; set; }
    }
}
