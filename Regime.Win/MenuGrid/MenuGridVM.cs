using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Regime.Domain;
using Regime.Win.DayControl;
using Regime.Win.Services;

namespace Regime.Win.MenuGrid
{
    public class MenuGridVM 
    {
        public Action RefreshGrid { get; set; }
        private readonly DataProviderService _dataProvider;
        public List<DayControlVM> Days { get; set; }

        public MenuGridVM(DataProviderService dataProvider)
        {
            _dataProvider = dataProvider;
            LoadDays();
            _dataProvider.RegimeChanged += (sender, args) =>
            {
                LoadDays();
                RefreshGrid();
            };
        }

        public void LoadDays()
        {
            if (_dataProvider.Regime == null)
            {
                Days = new List<DayControlVM>();
                return;
            }
            Days = _dataProvider.Regime.Select(d => new DayControlVM(_dataProvider, d)).ToList();
        }
    }
}
