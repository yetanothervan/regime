using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
    public class Dish
    {
        public Guid Id { get; set; }
        public string Caption { get; set; }
        public string Comment { get; set; }
        public DishItem[] Items { get; set; }
        public string Category { get; set; }

    }
}
