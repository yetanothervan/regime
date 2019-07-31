using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Prism.Commands;
using Regime.Domain;

namespace Regime.Win.IngredientsGrid
{
    public class IngredientDlgVM
    {
        public IngredientDlgVM()
        {
            OkButtonCommand = new DelegateCommand<Window>(wnd =>
            {
                wnd.DialogResult = true;
                wnd.Close();
            });
        }
        public Ingredient MyIngredient { get; set; }
        public DelegateCommand<Window> OkButtonCommand { get; set; }
    }
}
