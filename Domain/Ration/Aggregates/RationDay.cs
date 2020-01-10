using System;
using System.Collections.Generic;
using System.Text;
using Domain.SharedKernel;

namespace Domain.Ration.Aggregates
{
    public class RationDay : Entity
    {
        public RationDay(Guid id) : base(id)
        {
        }

        public string Caption { get; set; }
    }
}
