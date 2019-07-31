using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Newtonsoft.Json;
using Prism.Mvvm;

namespace Regime.Win
{
    public class MainWindowVM: BindableBase
    {
        private Visibility _jsonVisibility;
        public Settings Settings { get; set; }
        public MainWindowVM()
        {
            JsonVisibility = Visibility.Collapsed;
            LoadSettings();
        }

        private void LoadSettings()
        {
            const string path = "settings.json";
            if (File.Exists(path))
            {
                Settings = JsonConvert.DeserializeObject<Settings>(File.ReadAllText(path));
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

            UpdateVisibility();
        }

        private void UpdateVisibility()
        {
            
        }

        public Visibility JsonVisibility
        {
            get => _jsonVisibility;
            set => SetProperty(ref _jsonVisibility, value);
        }
    }
}
