using System;

namespace Domain.SharedKernel
{
    public abstract class Entity : IEquatable<Entity>
    {
        private readonly Guid _id;
        protected Entity(Guid id)
        {
            if (object.Equals(id, default(Guid)))
            {
                throw new ArgumentException(
                "The ID cannot be the default value.", "id");
            }
            this._id = id;
        }
        public Guid Id
        {
            get { return this._id; }
        }
        public override bool Equals(object obj)
        {
            var entity = obj as Entity;
            if (entity != null)
            {
                return this.Equals(entity);
            }
            return base.Equals(obj);
        }
        public override int GetHashCode()
        {
            return this.Id.GetHashCode();
        }
        public bool Equals(Entity other)
        {
            if (other == null)
            {
                return false;
            }
            return this.Id.Equals(other.Id);
        }
    }
}
