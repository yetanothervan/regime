using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;
using Regime.Win.Models;

namespace Regime.Win.DishesGrid
{
    public class DishDlgVM: BindableBase
    {
        private readonly List<Ingredient> _ingredients;
        private decimal _weight;
        public int SelectedIngredientIndex { get; set; }

        public decimal Weight
        {
            get => _weight;
            set
            {
                SetProperty(ref _weight, value); 
                RaisePropertyChanged(nameof(Summary));
            }
        }

        public List<string> Items { get; set; }
        public DishDlgVM(List<Ingredient> ingredients, DishViewModel dish)
        {
            _ingredients = ingredients;
            Items = ingredients.Select(i => i.Caption).ToList();
            Dish = dish;
            SetupCommands();
        }

        private void SetupCommands()
        {
            AddIngredientCommand = new DelegateCommand(() =>
            {
                if (SelectedIngredientIndex != -1)
                    Dish.Items.Add(new DishItemViewModel
                    {
                        Ingredient = _ingredients[SelectedIngredientIndex],
                        Weight = Weight
                    });
            });
            DeleteIngredientCommand = new DelegateCommand<DishItemViewModel>(model =>
            {
                if (model != null)
                    Dish.Items.Remove(model);
            });
            OkButtonCommand = new DelegateCommand<Window>(wnd =>
            {
                wnd.DialogResult = true;
                wnd.Close();
            });
        }

        public string Summary
        {
            get
            {
                if (SelectedIngredientIndex == -1 || _ingredients.Count == 0) return "";
                var ingredient = _ingredients[SelectedIngredientIndex];
                return $"{Weight} г, ККал: {ingredient.Kkal100 / 100 * Weight}, Блк: {ingredient.Protein100 / 100 * Weight}, Жир: {ingredient.Fat100 / 100 * Weight}, Угл: {ingredient.Carbon100 / 100 * Weight}";
            }
            set { }
        }

        public string DishSummary => Dish.TotalSummary;
        
        public DishViewModel Dish { get; set; }
        public DelegateCommand AddIngredientCommand { get; set; }
        public DelegateCommand<DishItemViewModel> DeleteIngredientCommand { get; set; }
        public DelegateCommand<Window> OkButtonCommand { get; set; }
    }
}
