using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Windows;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;
using Regime.Win.Services;

namespace Regime.Win.IngredientsGrid
{
    public class IngredientsGridVM : BindableBase, IDisposable
    {
        public DataProviderService DataProvider { get; private set; }
        public Action RefreshGrid { get; set; }
        public Ingredient SelectedIngredient { get; set; }

        public void Dispose()
        {
            if (DataProvider != null) DataProvider.IngredientsChanged -= DataProviderOnIngredientsChanged;
        }

        public IngredientsGridVM(DataProviderService dataProvider)
        {
            DataProvider = dataProvider;
            DataProvider.IngredientsChanged += DataProviderOnIngredientsChanged;

            SetupCommands();
        }

        private void DataProviderOnIngredientsChanged(object sender, EventArgs eventArgs)
        {
            RefreshGrid?.Invoke();
        }

        private void SetupCommands()
        {
            EditRowCommand = new DelegateCommand(() =>
            {
                if (SelectedIngredient == null) return;
                var dlgModel = new IngredientDlgVM {MyIngredient = SelectedIngredient.ShallowCopy()};
                var dlg = new IngredientDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    DataProvider.UpdateIngredient(dlgModel.MyIngredient);
                }
            });
            AddIngredientCommand = new DelegateCommand(() =>
            {
                var dlgModel = new IngredientDlgVM {MyIngredient = new Ingredient() {Id = Guid.NewGuid()}};
                var dlg = new IngredientDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                    DataProvider.UpdateIngredient(dlgModel.MyIngredient);
            });
            DeleteRowCommand = new DelegateCommand(() =>
            {
                if (SelectedIngredient == null) return;
                var dishes = DataProvider.Dishes.Where(d => d.Items.Any(i => i.IngredientId == SelectedIngredient.Id)).ToList();
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
                }
            });
        }
        
        public DelegateCommand EditRowCommand { get; set; }
        public DelegateCommand AddIngredientCommand { get; set; }
        public DelegateCommand DeleteRowCommand { get; set; }
    }
}
