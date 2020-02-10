using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.RationDay;

namespace Infrastructure.Interfaces
{
    public interface IDaysRepository
    {
        List<RationDay> GetDays();
    }
}
