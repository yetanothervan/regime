using System.Windows;
using Autofac;
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

            var builder = new ContainerBuilder();
            builder.RegisterType<MainWindowVM>().AsSelf();
            builder.RegisterType<IngredientsGridVM>().AsSelf();
            builder.RegisterType<DataProviderService>().AsSelf().SingleInstance();
            builder.RegisterType<SettingsService>().AsSelf().SingleInstance();
            Container = builder.Build();
            var model = Container.Resolve<MainWindowVM>();
            var view = new MainWindow.MainWindow { DataContext = model };
            view.Show();
        }

        public static bool IsDesignMode => 
            System.ComponentModel.DesignerProperties.GetIsInDesignMode(new DependencyObject());
    }
}
