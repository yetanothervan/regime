using System.Collections.Generic;
using System.IO;
using System.Windows;
using Newtonsoft.Json;
using Regime.Domain;

namespace Regime.Win.Services
{
    public class DataProviderService
    {
        public DataProviderService()
        {
            Ingredients = new List<Ingredient>();
        }
        public IReadOnlyList<Ingredient> Ingredients { get; private set; }
        public IReadOnlyList<MealType> MealTypes { get; private set; }
        public IReadOnlyList<Person> Persons { get; private set; }
        public IReadOnlyList<Dish> Dishes { get; private set; }
        public IReadOnlyList<Day> Regime { get; private set; }
        
        public bool LoadIngredientsFrom(string path)
        {
            var json = LoadJsonFrom<Ingredient>(path);
            if (json == null) return false;
            Ingredients = json;
            return true;
        }


        List<T> LoadJsonFrom<T>(string path)
        {
            if (!File.Exists(path)) return null;
            string fileName = Path.GetFileName(path);
            var errorOccured = false;
            var loaded = JsonConvert.DeserializeObject<List<T>>
            (File.ReadAllText(path), new JsonSerializerSettings()
            {
                Error = (sender, args) =>
                {
                    errorOccured = true;
                    MessageBox.Show(args.ErrorContext.Error.Message, $"Error while reading {fileName}");
                    args.ErrorContext.Handled = true;
                },
            });
            if (errorOccured) return null;
            return loaded ?? new List<T>();
        }

        public bool LoadRegimeFrom(string path)
        {
            var json = LoadJsonFrom<Day>(path);
            if (json == null) return false;
            Regime = json;
            return true;
        }

        public bool LoadDishesFrom(string path)
        {
            var json = LoadJsonFrom<Dish>(path);
            if (json == null) return false;
            Dishes = json;
            return true;
        }

        public bool LoadMealTypesFrom(string path)
        {
            var json = LoadJsonFrom<MealType>(path);
            if (json == null) return false;
            MealTypes = json;
            return true;
        }

        public bool LoadPersonsFrom(string path)
        {
            var json = LoadJsonFrom<Person>(path);
            if (json == null) return false;
            Persons = json;
            return true;
        }
    }
}
