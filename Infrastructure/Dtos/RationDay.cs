using System;
using System.Collections.Generic;
using System.Text;
using TypeGen.Core.TypeAnnotations;

namespace Infrastructure.Dtos
{
    [ExportTsClass]
    public class RationDay
    {
        public string Caption { get; set; }
        public Guid Id { get; set; }
    }
}
