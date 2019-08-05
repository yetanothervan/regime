using System;
using Newtonsoft.Json;

namespace Regime.Domain
{
    public class DishItem
    {
        public Guid IngredientId { get; set; }
        public decimal Weigth { get; set; }
    }
}