using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Regime.Domain;

namespace Regime.Win.Models
{
    public class DishViewModel : IEquatable<DishViewModel>
    {
        public DishViewModel()
        {
            Dish = new Dish() {Id = Guid.NewGuid()};
            Items = new ObservableCollection<DishItemViewModel>();
        }
        public Dish Dish { get; set; }
        public ObservableCollection<DishItemViewModel> Items { get; set; }
        public string IngredientsString {
            get => GetMultiplyedIngredientStr(1);
            private set {}
        }

        public string GetMultiplyedIngredientStr(decimal value)
        {
            var sb = new StringBuilder();
            foreach (var item in Items.OrderByDescending(i => i.Weight))
                sb.Append($"{item.Ingredient.Caption} {item.Weight * value} г, ");
            return sb.ToString().TrimEnd(',',' ');
        }

        public decimal TotalKkal => Items.Sum(i => i.Ingredient.Kkal100 / 100 * i.Weight);
        public decimal TotalProtein => Items.Sum(i => i.Ingredient.Protein100 / 100 * i.Weight);
        public decimal TotalFat => Items.Sum(i => i.Ingredient.Fat100 / 100 * i.Weight);
        public decimal TotalCarbon => Items.Sum(i => i.Ingredient.Carbon100 / 100 * i.Weight);


        public string TotalSummary
        {
            get => $"ККал: {TotalKkal}, Блк: {TotalProtein}, Жир: {TotalFat}, Угл: {TotalCarbon}";
            private set { }
        }
        
        public bool Equals(DishViewModel other)
        {
            if (ReferenceEquals(null, other)) return false;
            if (ReferenceEquals(this, other)) return true;
            return Dish.Id.Equals(other.Dish.Id);
        }

        public override int GetHashCode()
        {
            return (Dish != null ? Dish.Id.GetHashCode() : 0);
        }
    }
}
