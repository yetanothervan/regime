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
            DataContext = new IngredientsGridVM(() => { TheGrid.Items?.Refresh(); });
        }
    }
}
