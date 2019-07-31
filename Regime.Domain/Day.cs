using System.Collections.Generic;

namespace Regime.Domain
{
    public class Day
    {
        public string Caption { get; set; }
        public List<Meal> Meals { get; set; }
    }
}