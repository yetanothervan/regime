using System;

namespace Regime.Domain
{
    public class Person : IEquatable<Person>
    {
        public static bool operator ==(Person a, object b) => Equals(a, b);
        public static bool operator !=(Person a, object b) => !Equals(a, b);

        public Guid Id { get; set; }
        public string Name { get; set; }
        public decimal KkalTarget { get; set; }

        public bool Equals(Person other)
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
            return Equals((Person) obj);
        }

        public override int GetHashCode()
        {
            return Id.GetHashCode();
        }
    }
}