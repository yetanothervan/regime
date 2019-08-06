using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Regime.Domain;

namespace Regime.Win.Models
{
    public class DishViewModel
    {
        public DishViewModel()
        {
            Dish = new Dish() {Id = Guid.NewGuid()};
            Items = new ObservableCollection<DishItemViewModel>();
        }
        public Dish Dish { get; set; }
        public ObservableCollection<DishItemViewModel> Items { get; set; }
        public string IngredientsString {
            get
            {
                var sb = new StringBuilder();
                foreach (var item in Items.OrderByDescending(i => i.Weight))
                    sb.Append($"{item.Ingredient.Caption} {item.Weight} г,");
                return sb.ToString().TrimEnd(',');
            }
            private set { }
        }

        public string TotalSummary
        {
            get
            {
                var kkal = Items.Sum(i => i.Ingredient.Kkal100 / 100 * i.Weight);
                var protein = Items.Sum(i => i.Ingredient.Protein100 / 100 * i.Weight);
                var fat = Items.Sum(i => i.Ingredient.Fat100 / 100 * i.Weight);
                var carbon = Items.Sum(i => i.Ingredient.Carbon100 / 100 * i.Weight);
                return $"ККал: {kkal}, Блк: {protein}, Жир: {fat}, Угл: {carbon}";
            }
            private set { }
        }
    }
}
