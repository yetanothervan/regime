using System;
using System.IO;
using System.Windows;
using Newtonsoft.Json;
using Regime.Win.Models;

namespace Regime.Win.Services
{
    public class SettingsService
    {
        private Settings Settings { get; set; }
        public bool IsIngredientsPathCorrect { get; private set; } = false;
        public bool IsRegimePathCorrect { get; private set; } = false;
        public bool IsDishesPathCorrect { get; private set; } = false;
        public bool IsMealTypesPathCorrect { get; private set; } = false;
        public bool IsPersonsPathCorrect { get; private set; } = false;

        public SettingsService()
        {
            const string path = "settings.json";

            if (File.Exists(path))
            {
                Settings = JsonConvert.DeserializeObject<Settings>(File.ReadAllText(path), new JsonSerializerSettings()
                {
                    Error = (sender, args) =>
                    {
                        MessageBox.Show(args.ErrorContext.Error.Message, "Error while reading settings.json");
                        args.ErrorContext.Handled = true;
                        Settings = new Settings();
                    },
                });
            }
            else
            {
                Settings = new Settings();
                string newSettings = JsonConvert.SerializeObject(Settings, Formatting.Indented);

                using (var fs = File.Create(path))
                using (var sw = new StreamWriter(fs))
                {
                    sw.Write(newSettings);
                }
            }
        }

        public event EventHandler SettingsChanged;
        protected virtual void OnSettingsChanged(EventArgs e)
        {
            SettingsChanged?.Invoke(this, e);
        }
    }
}