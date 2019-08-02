using System;
using System.IO;
using System.Windows;
using Newtonsoft.Json;
using Regime.Win.Models;

namespace Regime.Win.Services
{
    public class SettingsService
    {
        private readonly DataProviderService _dataProvider;

        public SettingsService(DataProviderService dataProvider)
        {
            _dataProvider = dataProvider;
            LoadSettings();
        }
        private Settings Settings { get; set; }
        public bool IsIngredientsPathCorrect { get; private set; } = false;
        public bool IsRegimePathCorrect { get; private set; } = false;
        public bool IsDishesPathCorrect { get; private set; } = false;
        public bool IsMealTypesPathCorrect { get; private set; } = false;
        public bool IsPersonsPathCorrect { get; private set; } = false;

        public void LoadSettings()
        {
            if (File.Exists(Constants.SettingsPath))
            {
                Settings = JsonConvert.DeserializeObject<Settings>(File.ReadAllText(Constants.SettingsPath),
                               new JsonSerializerSettings()
                               {
                                   Error = (sender, args) =>
                                   {
                                       MessageBox.Show(args.ErrorContext.Error.Message,
                                           "Error while reading settings.json");
                                       args.ErrorContext.Handled = true;
                                       Settings = new Settings();
                                   },
                               }) ?? new Settings();

                IsIngredientsPathCorrect = _dataProvider.LoadIngredientsFrom(Settings.PathIngredients);
                IsRegimePathCorrect = _dataProvider.LoadRegimeFrom(Settings.PathRegime);
                IsDishesPathCorrect = _dataProvider.LoadDishesFrom(Settings.PathDishes);
                IsMealTypesPathCorrect = _dataProvider.LoadMealTypesFrom(Settings.PathMealTypes);
                IsPersonsPathCorrect = _dataProvider.LoadPersonsFrom(Settings.PathPersons);
            }
            else
            {
                Settings = new Settings();
                SaveSettings();
            }
        }

        public event EventHandler SettingsChanged;
        protected virtual void OnSettingsChanged(EventArgs e)
        {
            SettingsChanged?.Invoke(this, e);
        }

        public void SetIngredientsPath(string path)
        {
            if (_dataProvider.LoadIngredientsFrom(path))
            {
                Settings.PathIngredients = path;
                IsIngredientsPathCorrect = true;
                SaveSettings();
                OnSettingsChanged(new EventArgs());
            }
        }

        private void SaveSettings()
        {
            string newSettings = JsonConvert.SerializeObject(Settings, Formatting.Indented);

            using (var fs = File.Create(Constants.SettingsPath))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newSettings);
            }
        }

        public void SetDishesPath(string path)
        {
            if (_dataProvider.LoadDishesFrom(path))
            {
                Settings.PathDishes = path;
                IsDishesPathCorrect = true;
                SaveSettings();
                OnSettingsChanged(new EventArgs());
            }
        }

        public void SetMealTypesPath(string path)
        {
            if (_dataProvider.LoadMealTypesFrom(path))
            {
                Settings.PathMealTypes = path;
                IsMealTypesPathCorrect = true;
                SaveSettings();
                OnSettingsChanged(new EventArgs());
            }
        }

        public void SetPersonsPath(string path)
        {
            if (_dataProvider.LoadPersonsFrom(path))
            {
                Settings.PathPersons = path;
                IsPersonsPathCorrect = true;
                SaveSettings();
                OnSettingsChanged(new EventArgs());
            }
        }

        public void SetRegimePath(string path)
        {
            if (_dataProvider.LoadRegimeFrom(path))
            {
                Settings.PathRegime = path;
                IsRegimePathCorrect = true;
                SaveSettings();
                OnSettingsChanged(new EventArgs());
            }
        }
    }
}