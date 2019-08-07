using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Navigation;
using System.Windows.Shapes;
using Autofac;
using Regime.Win.DishesGrid;

namespace Regime.Win.MenuGrid
{
    /// <summary>
    /// Interaction logic for MenuGrid.xaml
    /// </summary>
    public partial class MenuGrid : UserControl
    {
        public MenuGrid()
        {
            InitializeComponent();
            if (App.IsDesignMode) return;
            var model = App.Container.Resolve<MenuGridVM>();
            model.RefreshGrid = () =>
            {
                TheList.ItemsSource = null;
                TheList.ItemsSource = model.Days;
            };
            DataContext = model;
        }
    }
}
