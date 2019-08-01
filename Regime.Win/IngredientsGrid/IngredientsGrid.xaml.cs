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

namespace Regime.Win.IngredientsGrid
{
    /// <summary>
    /// Interaction logic for IngredientsGrid.xaml
    /// </summary>
    public partial class IngredientsGrid : UserControl
    {
        public IngredientsGrid()
        {
            InitializeComponent();
            if (App.IsDesignMode) return;
            var model = App.Container.Resolve<IngredientsGridVM>();
            model.RefreshGrid =() => { TheGrid.Items?.Refresh(); };
            DataContext = model;
        }
    }
}