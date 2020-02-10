using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.RationDay;

namespace Infrastructure.Interfaces
{
    public interface IDaysManager
    {
        RationDay UpdateDay(RationDay day);
        string DeleteDay(Guid id);
    }
}
