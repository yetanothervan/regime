﻿using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
    public class Meal
    {
        public Guid Id { get; set; }
        public Guid MealTypeId { get; set; }

        public List<MealItem> MealItems { get; set; }
    }
}
