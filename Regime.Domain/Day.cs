using System;
using System.Collections.Generic;

namespace Regime.Domain
{
    public class Day
    {
        public Day()
        {
            Meals = new List<Meal>();
        }
        public Guid Id { get; set; }
        public string Caption { get; set; }
        public List<Meal> Meals { get; set; }
    }
}