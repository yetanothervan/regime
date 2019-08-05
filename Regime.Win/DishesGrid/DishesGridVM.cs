using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;
using Regime.Win.Models;
using Regime.Win.Services;

namespace Regime.Win.DishesGrid
{
    public class DishesGridVM : BindableBase, IDisposable
    {
        private readonly DataProviderService _dataProvider;
        public List<DishViewModel> Dishes { get; set; }
        public Action RefreshGrid { get; set; }
        public int SelectedDishIndex { get; set; }
        public DishesGridVM(DataProviderService dataProvider)
        {
            _dataProvider = dataProvider;
            dataProvider.DishesChanged += DataProviderOnDishesChanged;
            LoadDishesIncludedIngredients();
            SetupCommand();
            
        }

        private void DataProviderOnDishesChanged(object sender, EventArgs eventArgs)
        {
            LoadDishesIncludedIngredients();
            RefreshGrid?.Invoke();
        }

        private void LoadDishesIncludedIngredients()
        {
            Dishes = _dataProvider.Dishes.Select(d => new DishViewModel()
            {
                Dish = d
            }).OrderBy(d => d.Dish.Caption).ToList();
            foreach (var dish in Dishes)
            {
                foreach (var dishItem in dish.Dish.Items)
                {
                    var ingredient = _dataProvider.Ingredients.FirstOrDefault(i => i.Id == dishItem.IngredientId);
                    dish.Items.Add(ingredient == null
                        ? new DishItemViewModel() {Ingredient = new Ingredient() {Caption = "!Unknown!"}}
                        : new DishItemViewModel() {Ingredient = ingredient, Weight = dishItem.Weigth});
                }
            }
        }


        private void SetupCommand()
        {
            AddDishCommand = new DelegateCommand(() =>
            {
                var d = new DishViewModel();
                var dlgModel = new DishDlgVM(_dataProvider.Ingredients.ToList(), d);
                var dlg = new DishDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    var dish = new Dish()
                    {
                        Caption = dlgModel.Dish.Dish.Caption,
                        Id = Guid.NewGuid(),
                        Items = dlgModel.Dish.Items.Select(i =>
                            new Domain.DishItem() {Weigth = i.Weight, IngredientId = i.Ingredient.Id}).ToList()
                    };
                    _dataProvider.UpdateDish(dish);
                }
            });

            EditDishCommand = new DelegateCommand(() =>
            {
                if (SelectedDishIndex == -1) return;
                var d = Dishes[SelectedDishIndex];
                var dlgModel = new DishDlgVM(_dataProvider.Ingredients.ToList(), d);
                var dlg = new DishDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    var dish = new Dish()
                    {
                        Caption = dlgModel.Dish.Dish.Caption,
                        Id = dlgModel.Dish.Dish.Id,
                        Items = dlgModel.Dish.Items.Select(i =>
                            new Domain.DishItem() { Weigth = i.Weight, IngredientId = i.Ingredient.Id }).ToList()
                    };
                    _dataProvider.UpdateDish(dish);
                }
            });

            DeleteDishCommand = new DelegateCommand(() =>
            {
                if (SelectedDishIndex == -1) return;

                /*var dishes = DataProvider.Dishes.Where(d => d.Items.Any(i => i.IngredientId == SelectedIngredient.Id)).ToList();
                if (dishes.Any())
                {
                    var sb = new StringBuilder();
                    foreach (var dish in dishes)
                    {
                        sb.Append(dish.Caption);
                        sb.Append(", ");
                    }

                    var dishesStr = sb.ToString().Trim(' ', ',');
                    MessageBox.Show($"Ингредиент удалить нельзя, т.к. он входит в состав блюд: {dishesStr}");
                    return;
                }

                var dialogResult =
                    MessageBox.Show($"Вы действительно хотите удалить {SelectedIngredient.Caption}",
                        "Are you sure?", MessageBoxButton.OKCancel);
                if (dialogResult == MessageBoxResult.OK)
                {
                    DataProvider.DeleteIngredient(SelectedIngredient);
                }*/
            });
        }

        public DelegateCommand AddDishCommand { get; set; }
        public DelegateCommand EditDishCommand { get; set; }
        public DelegateCommand DeleteDishCommand { get; set; }

        public void Dispose()
        {
            if (_dataProvider != null) _dataProvider.DishesChanged -= DataProviderOnDishesChanged;
        }
    }
}
