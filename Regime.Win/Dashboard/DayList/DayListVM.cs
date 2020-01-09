using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prism.Mvvm;

namespace Regime.Win.Dashboard.DayList
{
    public class DayListVM : BindableBase
    {
        public ReadOnlyObservableCollection<string> Days { get; set; }

        public DayListVM()
        {
            Days = new ReadOnlyObservableCollection<string>(
                new ObservableCollection<string>(new[] {"oeau", "oeuoeu", "oeuosentuh"}));
        }
    }
}
