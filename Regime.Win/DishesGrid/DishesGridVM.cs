using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;

namespace Regime.Win.DishesGrid
{
    public class DishesGridVM : BindableBase
    {
        public List<Dish> Dishes { get; set; }

        public DishesGridVM()
        {
            Dishes = new List<Dish>()
            {
                new Dish() {Caption = "ouoeuoeu"},
                new Dish() {Caption = "thdthdthdt"},
                new Dish() {Caption = "ouoeuoeu"},
                new Dish() {Caption = "thdthdthdt"},
                new Dish() {Caption = "ouoeuoeu"},
                new Dish() {Caption = "thdthdthdt"},
                new Dish() {Caption = "ouoeuoeu"},
                new Dish() {Caption = "thdthdthdt"},
                new Dish() {Caption = "ouoeuoeu"},
                new Dish() {Caption = "thdthdthdt"},
            };
            SetupCommand();
        }

        private void SetupCommand()
        {
            AddDishCommand = new DelegateCommand(() =>
            {
                var dlgModel = new DishDlgVM();
                var dlg = new DishDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                    // DataProvider.UpdateIngredient(dlgModel.MyIngredient);
                    ;
            });
        }

        public DelegateCommand AddDishCommand { get; set; }
    }
}
