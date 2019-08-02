using System;
using System.Text;
using System.Windows;
using System.Windows.Media.Media3D;
using Microsoft.Win32;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Win.Services;

namespace Regime.Win.MainWindow
{
    public class MainWindowVM: BindableBase
    {
        private readonly SettingsService _settings;
        private Visibility _jsonVisibility;
        private Visibility _menuVisibility;
        private string _visibilityText;

        public MainWindowVM(SettingsService settings)
        {
            JsonVisibility = Visibility.Collapsed;
            _settings = settings;
            _settings.SettingsChanged += (sender, args) => UpdateVisibility();
            UpdateVisibility();
            SetupCommands();
        }

        private void SetupCommands()
        {
            ExitCommand = new DelegateCommand(() => Application.Current.Shutdown());
            SelectIngredientsFileCommand = new DelegateCommand(() =>
            {
                if (FileDlg(Constants.IngredientsFileName, out var path))
                    _settings.SetIngredientsPath(path);
            });
            SelectDishesFileCommand = new  DelegateCommand(() =>
            {
                if (FileDlg(Constants.DishesFileName, out var path))
                    _settings.SetDishesPath(path);
            });
            SelectMealTypesFileCommand = new DelegateCommand(() =>
            {
                if (FileDlg(Constants.MealTypesFileName, out var path))
                    _settings.SetMealTypesPath(path);
            });
            SelectPersonsFileCommand = new DelegateCommand(() =>
            {
                if (FileDlg(Constants.PersonsFileName, out var path))
                    _settings.SetPersonsPath(path);
            });
            SelectRegimeFileCommand = new DelegateCommand(() =>
            {
                if (FileDlg(Constants.RegimeFileName, out var path))
                    _settings.SetRegimePath(path);
            });
        }

        bool FileDlg(string filename, out string path)
        {
            var dlg = new OpenFileDialog
            {
                DefaultExt = ".json",
                Filter = $"{filename}|{filename}",
                Multiselect = false
            };
            var result = dlg.ShowDialog();
            if (result == true)
            {
                path = dlg.FileName;
                return true;
            }

            path = null;
            return false;
        }

        private void UpdateVisibility()
        {
            var sb = new StringBuilder();
            if (!_settings.IsRegimePathCorrect)
                sb.AppendLine($"Выберите файл {Constants.RegimeFileName}");
            if (!_settings.IsIngredientsPathCorrect)
                sb.AppendLine($"Выберите файл {Constants.IngredientsFileName}");
            if (!_settings.IsDishesPathCorrect)
                sb.AppendLine($"Выберите файл {Constants.DishesFileName}");
            if (!_settings.IsMealTypesPathCorrect)
                sb.AppendLine($"Выберите файл {Constants.MealTypesFileName}");
            if (!_settings.IsPersonsPathCorrect)
                sb.AppendLine($"Выберите файл {Constants.PersonsFileName}");
            var result = sb.ToString();
            VisibilityText = result;
            JsonVisibility = !string.IsNullOrEmpty(result) 
                ? Visibility.Visible 
                : Visibility.Collapsed;
            MenuVisibility = !string.IsNullOrEmpty(result)
                ? Visibility.Collapsed
                : Visibility.Visible;
        }
        
        public string VisibilityText
        {
            get => _visibilityText;
            set => SetProperty(ref _visibilityText, value);
        }

        public Visibility JsonVisibility
        {
            get => _jsonVisibility;
            set => SetProperty(ref _jsonVisibility, value);
        }

        public Visibility MenuVisibility
        {
            get => _menuVisibility;
            set => SetProperty(ref _menuVisibility, value);
        }

        public DelegateCommand SelectIngredientsFileCommand { get; set; }
        public DelegateCommand SelectDishesFileCommand { get; set; }
        public DelegateCommand SelectMealTypesFileCommand { get; set; }
        public DelegateCommand SelectPersonsFileCommand { get; set; }
        public DelegateCommand SelectRegimeFileCommand { get; set; }
        public DelegateCommand ExitCommand { get; set; }
    }
}
