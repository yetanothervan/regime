using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Regime.Domain;
using Regime.Win.Models;
using Regime.Win.Services;

namespace Regime.Win
{
    public static class Util
    {
        public static List<DishViewModel> LoadDishesIncludedIngredients(DataProviderService dataProvider)
        {
            if (dataProvider.Dishes == null) return new List<DishViewModel>();
            var dishes = dataProvider.Dishes.Select(d => new DishViewModel()
            {
                Dish = d
            }).OrderBy(d => d.Dish.Caption).ToList();
            foreach (var dish in dishes)
            {
                foreach (var dishItem in dish.Dish.Items)
                {
                    var ingredient = dataProvider.Ingredients.FirstOrDefault(i => i.Id == dishItem.IngredientId);
                    dish.Items.Add(ingredient == null
                        ? new DishItemViewModel() { Ingredient = new Ingredient() { Caption = "!Unknown!" } }
                        : new DishItemViewModel() { Ingredient = ingredient, Weight = dishItem.Weigth });
                }
            }

            return dishes;
        }
    }
}
