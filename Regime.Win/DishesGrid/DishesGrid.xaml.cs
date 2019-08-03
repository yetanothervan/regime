using System.Windows.Controls;
using Autofac;

namespace Regime.Win.DishesGrid
{
    /// <summary>
    /// Interaction logic for DishesGrid.xaml
    /// </summary>
    public partial class DishesGrid : UserControl
    {
        public DishesGrid()
        {
            InitializeComponent();
            if (App.IsDesignMode) return;
            var model = App.Container.Resolve<DishesGridVM>();
            DataContext = model;
        }
    }
}
