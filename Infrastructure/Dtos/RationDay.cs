﻿using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
    public class RationDay
    {
        public Guid Id { get; set; }

        public string Caption { get; set; }

        public decimal TotalKkal { get; set; }

        public List<Meal> Meals { get; set; }
    }
}
