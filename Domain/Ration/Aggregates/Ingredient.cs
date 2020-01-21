using System;
using Domain.SharedKernel;

namespace Domain.Ration.Aggregates
{
    public class Ingredient : Entity
    {
        public Ingredient(Guid id) : base(id)
        {
        }

        public string Caption { get; set; }
        public decimal Kkal100 { get; set; }
        public decimal Protein100 { get; set; }
        public decimal Fat100 { get; set; }
        public decimal Carbon100 { get; set; }
        public string Comment { get; set; }
        
        public Ingredient Copy()
        {
            return (Ingredient)MemberwiseClone();
        }
    }
}
