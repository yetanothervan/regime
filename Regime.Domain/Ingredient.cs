using System;

namespace Regime.Domain
{
    public class Ingredient
    {
        public Guid Id { get; set; }
        public string Caption { get; set; }
        public decimal Kkal100 { get; set; }
        public decimal Protein100 { get; set; }
        public decimal Fat100 { get; set; }
        public decimal Carbon100 { get; set; }

        public Ingredient ShallowCopy()
        {
            return (Ingredient) MemberwiseClone();
        }
    }
}
