using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
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
            Dishes = Util.LoadDishesIncludedIngredients(_dataProvider);
            SetupCommand();
            
        }

        private void DataProviderOnDishesChanged(object sender, EventArgs eventArgs)
        {
            Dishes = Util.LoadDishesIncludedIngredients(_dataProvider);
            RefreshGrid?.Invoke();
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
                var current = Dishes[SelectedDishIndex];
                var days =
                    _dataProvider.Regime.Where(d => d.Meals.Any(m => m.Items.Any(i => i.DishId == current.Dish.Id)))
                        .ToList();
                
                if (days.Any())
                {
                    var sb = new StringBuilder();
                    foreach (var day in days)
                    {
                        sb.Append(day.Caption);
                        sb.Append(", ");
                    }

                    var daysStr = sb.ToString().Trim(' ', ',');
                    MessageBox.Show($"Блюдо удалить нельзя, т.к. он входит в меню дней: {daysStr}");
                    return;
                }

                var dialogResult =
                    MessageBox.Show($"Вы действительно хотите удалить {current.Dish.Caption}",
                        "Are you sure?", MessageBoxButton.OKCancel);
                if (dialogResult == MessageBoxResult.OK)
                {
                    _dataProvider.DeleteDish(current.Dish);
                }
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
