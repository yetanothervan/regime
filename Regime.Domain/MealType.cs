using System;

namespace Regime.Domain
{
    public class MealType : IEquatable<MealType>
    {
        public Guid Id { get; set; }
        public string Caption { get; set; }
        public decimal KkalTotal { get; set; }
        public decimal ProteinPart { get; set; }
        public decimal FatPart { get; set; }
        public decimal CarbonPart { get; set; }

        public bool Equals(MealType other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Id.Equals(other.Id);
        }

        public override bool Equals(object obj)
        {
            if (ReferenceEquals(null, obj)) return false;
            if (ReferenceEquals(this, obj)) return true;
            if (obj.GetType() != this.GetType()) return false;
            return Equals((MealType) obj);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }

        public static bool operator ==(MealType a, MealType b) => Equals(a, b);
        public static bool operator !=(MealType a, MealType b) => !Equals(a, b);
    }
}