using System;
using System.Collections.Generic;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;

namespace Regime.Win.IngredientsGrid
{
    public class IngredientsGridVM : BindableBase
    {
        private readonly Action _refreshGrid;
        public List<Ingredient> Ingredients { get; set; }

        public Ingredient SelectedIngredient { get; set; }

        public IngredientsGridVM(Action refreshGrid)
        {
            _refreshGrid = refreshGrid;
            Ingredients = new List<Ingredient>()
            {
                new Ingredient()
                {
                    Caption = "oeuo",
                    Carbon100 = 100,
                    Fat100 = 20.5m,
                    Id = Guid.NewGuid(),
                    Kkal100 = 300,
                    Protein100 = 2.2m
                },
                new Ingredient()
                {
                    Caption = "thdthd",
                    Carbon100 = 200,
                    Fat100 = 21.5m,
                    Id = Guid.NewGuid(),
                    Kkal100 = 100,
                    Protein100 = 1.1m
                }
            };
            SetupCommands();
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
                    var ing = Ingredients.Find(i => i.Id == dlgModel.MyIngredient.Id);
                    ing.CopyPropertiesFrom(dlgModel.MyIngredient);
                    _refreshGrid?.Invoke();
                }
            });
            AddIngredientCommand = new DelegateCommand(() =>
            {
                var dlgModel = new IngredientDlgVM {MyIngredient = new Ingredient() {Id = Guid.NewGuid()}};
                var dlg = new IngredientDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    Ingredients.Add(dlgModel.MyIngredient);
                    _refreshGrid?.Invoke();
                }
            });
        }

        public DelegateCommand EditRowCommand { get; set; }
        public DelegateCommand AddIngredientCommand { get; set; }
    }
}
