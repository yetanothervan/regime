using System;

namespace Domain.SharedKernel
{
    public abstract class Entity : IEquatable<Entity>
    {
        protected Entity(Guid id)
        {
            this.Id = id;
        }
        public Guid Id { get; }

        public override bool Equals(object obj) 
            => obj is Entity entity && Equals(entity);

        public override int GetHashCode() => this.Id.GetHashCode();

        public bool Equals(Entity other) 
            => other != null && Id.Equals(other.Id);
    }
}
