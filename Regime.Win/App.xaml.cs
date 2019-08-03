using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using Autofac;
using Regime.Win.DishesGrid;
using Regime.Win.IngredientsGrid;
using Regime.Win.MainWindow;
using Regime.Win.Services;

namespace Regime.Win
{
    /// <summary>
    /// Interaction logic for App.xaml
    /// </summary>
    public partial class App : Application
    {
        public static IContainer Container { get; set; }
        protected override void OnStartup(StartupEventArgs e)
        {
            base.OnStartup(e);
            if (Container != null) return;

            // Select the text in a TextBox when it receives focus.
            EventManager.RegisterClassHandler(typeof(TextBox), TextBox.PreviewMouseLeftButtonDownEvent,
                new MouseButtonEventHandler(SelectivelyIgnoreMouseButton));
            EventManager.RegisterClassHandler(typeof(TextBox), TextBox.GotKeyboardFocusEvent,
                new RoutedEventHandler(SelectAllText));
            EventManager.RegisterClassHandler(typeof(TextBox), TextBox.MouseDoubleClickEvent,
                new RoutedEventHandler(SelectAllText));
            base.OnStartup(e);

            var builder = new ContainerBuilder();
            builder.RegisterType<MainWindowVM>().AsSelf();
            builder.RegisterType<IngredientsGridVM>().AsSelf();
            builder.RegisterType<DataProviderService>().AsSelf().SingleInstance();
            builder.RegisterType<SettingsService>().AsSelf().SingleInstance();
            builder.RegisterType<DishesGridVM>().AsSelf();
            Container = builder.Build();
            var model = Container.Resolve<MainWindowVM>();
            var view = new MainWindow.MainWindow { DataContext = model };
            view.Show();
        }

        public static bool IsDesignMode => 
            System.ComponentModel.DesignerProperties.GetIsInDesignMode(new DependencyObject());
        
        void SelectivelyIgnoreMouseButton(object sender, MouseButtonEventArgs e)
        {
            // Find the TextBox
            DependencyObject parent = e.OriginalSource as UIElement;
            while (parent != null && !(parent is TextBox))
                parent = VisualTreeHelper.GetParent(parent);

            if (parent != null)
            {
                var textBox = (TextBox)parent;
                if (!textBox.IsKeyboardFocusWithin)
                {
                    // If the text box is not yet focused, give it the focus and
                    // stop further processing of this click event.
                    textBox.Focus();
                    e.Handled = true;
                }
            }
        }

        void SelectAllText(object sender, RoutedEventArgs e)
        {
            var textBox = e.OriginalSource as TextBox;
            if (textBox != null)
                textBox.SelectAll();
        }
    }
}
