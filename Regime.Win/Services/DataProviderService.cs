using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Windows;
using Newtonsoft.Json;
using Regime.Domain;

namespace Regime.Win.Services
{
    public class DataProviderService
    {
        private IReadOnlyList<Ingredient> _ingredients;
        private IReadOnlyList<MealType> _mealTypes;
        private IReadOnlyList<Person> _persons;
        private IReadOnlyList<Dish> _dishes;
        private IReadOnlyList<Day> _regime;
        
        public IReadOnlyList<Ingredient> Ingredients
        {
            get => _ingredients;
            private set
            {
                _ingredients = value; 
                OnIngredientsChanged();
            }
        }

        public event EventHandler IngredientsChanged;

        public IReadOnlyList<MealType> MealTypes
        {
            get => _mealTypes;
            private set
            {
                _mealTypes = value; 
                OnMealTypesChanged();
            }
        }

        public event EventHandler MealTypesChanged;

        public IReadOnlyList<Person> Persons
        {
            get => _persons;
            private set
            {
                _persons = value; 
                OnPersonsChanged();
            }
        }

        public event EventHandler PersonsChanged;

        public IReadOnlyList<Dish> Dishes
        {
            get => _dishes;
            private set
            {
                _dishes = value; 
                OnDishesChanged();
            }
        }

        public event EventHandler DishesChanged;

        public IReadOnlyList<Day> Regime
        {
            get => _regime;
            private set
            {
                _regime = value;
                OnRegimeChanged();
            }
        }

        public event EventHandler RegimeChanged;

        public void UpdateIngredient(Ingredient ing)
        {
            if (!(Ingredients is List<Ingredient> list)) return;
            if (!list.Exists(i => i.Id == ing.Id)) list.Add(ing);
            else
            {
                var itm = list.Find(i => i.Id == ing.Id);
                itm.CopyPropertiesFrom(ing);
            }

            SaveIngredients();
        }

        public void DeleteIngredient(Ingredient ing)
        {
            if (!(Ingredients is List<Ingredient> list)) return;
            if (!list.Exists(i => i.Id == ing.Id)) return;

            var itm = list.Find(i => i.Id == ing.Id);
            list.Remove(itm);
            SaveIngredients();
        }

        void SaveIngredients()
        {
            string newIngs = JsonConvert.SerializeObject(Ingredients, Formatting.Indented);
            using (var fs = File.Create(_ingredientsPath))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newIngs);
            }
            OnIngredientsChanged();
        }

        private string _ingredientsPath = String.Empty;
        public bool LoadIngredientsFrom(string path)
        {
            var json = LoadJsonFrom<Ingredient>(path);
            if (json == null) return false;
            Ingredients = json;
            _ingredientsPath = path;
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

        private string _regimePath = String.Empty;
        public bool LoadRegimeFrom(string path)
        {
            var json = LoadJsonFrom<Day>(path);
            if (json == null) return false;
            Regime = json;
            _regimePath = path;
            return true;
        }

        private string _dishesPath = String.Empty;
        public bool LoadDishesFrom(string path)
        {
            var json = LoadJsonFrom<Dish>(path);
            if (json == null) return false;
            Dishes = json;
            _dishesPath = path;
            return true;
        }

        private string _mealTypePath = String.Empty;
        public bool LoadMealTypesFrom(string path)
        {
            var json = LoadJsonFrom<MealType>(path);
            if (json == null) return false;
            MealTypes = json;
            _mealTypePath = path;
            return true;
        }

        private string _personsPath = String.Empty;
        public bool LoadPersonsFrom(string path)
        {
            var json = LoadJsonFrom<Person>(path);
            if (json == null) return false;
            Persons = json;
            _personsPath = path;
            return true;
        }

        protected virtual void OnIngredientsChanged()
        {
            IngredientsChanged?.Invoke(this, EventArgs.Empty);
        }

        protected virtual void OnMealTypesChanged()
        {
            MealTypesChanged?.Invoke(this, EventArgs.Empty);
        }

        protected virtual void OnPersonsChanged()
        {
            PersonsChanged?.Invoke(this, EventArgs.Empty);
        }

        protected virtual void OnDishesChanged()
        {
            DishesChanged?.Invoke(this, EventArgs.Empty);
        }

        protected virtual void OnRegimeChanged()
        {
            RegimeChanged?.Invoke(this, EventArgs.Empty);
        }
    }
}
