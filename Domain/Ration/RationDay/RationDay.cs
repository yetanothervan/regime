using System;
using Domain.SharedKernel;

namespace Domain.Ration.RationDay
{
    public class RationDay : Entity, IAggregationRoot
    {
        public RationDay(Guid id) : base(id)
        {
        }

        public string Caption { get; set; }
    }
}
