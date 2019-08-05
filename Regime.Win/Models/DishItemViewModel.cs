using Regime.Domain;

namespace Regime.Win.Models
{
    public class DishItemViewModel
    {
        public Ingredient Ingredient { get; set; }
        public decimal Weight { get; set; }
        public string Summary => 
            $"{Weight} г, ККал: {Ingredient.Kkal100 / 100 * Weight}, Блк: {Ingredient.Protein100 / 100 * Weight}, Жир: {Ingredient.Fat100 / 100 * Weight}, Угл: {Ingredient.Carbon100 / 100 * Weight}";
    }
}