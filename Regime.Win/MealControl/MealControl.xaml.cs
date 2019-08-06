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

namespace Regime.Win.MealControl
{
    /// <summary>
    /// Interaction logic for MealControl.xaml
    /// </summary>
    public partial class MealControl : UserControl
    {
        public MealControl()
        {
            InitializeComponent();
            if (App.IsDesignMode) return;
            var model = App.Container.Resolve<MealControlVM>();
            DataContext = model;
        }
    }
}
