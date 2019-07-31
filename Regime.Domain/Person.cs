using System;

namespace Regime.Domain
{
    public class Person
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal KkalTarget { get; set; }
    }
}