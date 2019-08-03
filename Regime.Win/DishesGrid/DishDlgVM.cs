using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Controls;
using System.Windows.Input;
using Prism.Commands;

namespace Regime.Win.DishesGrid
{
    public class DishDlgVM
    {
        private List<string> _source;
        public List<string> Items { get; set; }
        public DishDlgVM()
        {
            _source = new List<string>() {"123", "124", "125", "126", "135", "136", "137", "aoe", "aoee", "aaoe" };
            Items = _source.ToList();
            DishItems = new List<Domain.DishItem>()
            {
                new Domain.DishItem() {Weigth = 100},
                new Domain.DishItem()  {Weigth = 100}
            };
            Caption = "Some Caption";
        }
        public string Caption { get; set; }
        public List<Domain.DishItem> DishItems { get; set; }
    }
}
