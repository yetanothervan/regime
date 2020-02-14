using System;
using System.Collections.Generic;
using System.Text;

namespace Infrastructure.Dtos
{
    public class MealItem 
    {
        public Guid Id { get; set; }
        public Guid DishId { get; set; }
        public decimal Weight { get; set; }
    }
}
