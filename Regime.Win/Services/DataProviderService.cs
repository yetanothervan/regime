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

        public IReadOnlyList<MealType> MealTypes { get; private set; }

        public IReadOnlyList<Person> Persons { get; private set; }

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

        public void SetPersonsAndMealTypes()
        {
            if (Persons.Count != 0) return;

            Persons = new List<Person>()
            {
                new Person() {Id = Guid.NewGuid(), KkalTarget = 2000, Name = "Саша"},
                new Person() {Id = Guid.NewGuid(), KkalTarget = 1500, Name = "Лена"}
            };
            string personsStr = JsonConvert.SerializeObject(Persons, Formatting.Indented);
            using (var fs = File.Create(_personsPath))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(personsStr);
            }

            MealTypes = new List<MealType>()
            {
                new MealType() {Id = Guid.NewGuid(), Caption = "Завтрак Саша",
                    CarbonPart = 0.5m, FatPart = 0.3m, ProteinPart = 0.2m, KkalTotal = 500},
                new MealType() {Id = Guid.NewGuid(), Caption = "Обед Саша", CarbonPart = 0.5m, FatPart = 0.3m, ProteinPart = 0.2m, KkalTotal = 700},
                new MealType() {Id = Guid.NewGuid(), Caption = "Ужин Саша", CarbonPart = 0.5m, FatPart = 0.3m, ProteinPart = 0.2m, KkalTotal = 400},
                new MealType() {Id = Guid.NewGuid(), Caption = "Перекус Саша", CarbonPart = 0.5m, FatPart = 0.3m, ProteinPart = 0.2m, KkalTotal = 200},

                new MealType() {Id = Guid.NewGuid(), Caption = "Завтрак Лена", CarbonPart = 0.5m, FatPart = 0.3m, ProteinPart = 0.2m, KkalTotal = 500},
                new MealType() {Id = Guid.NewGuid(), Caption = "Ужин Лена", CarbonPart = 0.5m, FatPart = 0.3m, ProteinPart = 0.2m, KkalTotal = 400}
            };
            string mealStrings = JsonConvert.SerializeObject(MealTypes, Formatting.Indented);
            using (var fs = File.Create(_mealTypePath))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(mealStrings);
            }
        }

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

        public void UpdateDish(Dish dish)
        {
            if (!(Dishes is List<Dish> list)) return;
            if (!list.Exists(i => i.Id == dish.Id)) list.Add(dish);
            else
            {
                var itm = list.Find(i => i.Id == dish.Id);
                itm.Caption = dish.Caption;
                itm.Items = new List<DishItem>(dish.Items.Select(
                    a => new DishItem()
                    {
                        Weigth = a.Weigth,
                        IngredientId = a.IngredientId
                    }));
            }

            SaveDishes();
        }

        public void DeleteDish(Dish dish)
        {
            if (!(Dishes is List<Dish> list)) return;
            if (!list.Exists(i => i.Id == dish.Id)) return;

            var itm = list.Find(i => i.Id == dish.Id);
            list.Remove(itm);
            SaveDishes();
        }

        void SaveDishes()
        {
            string newDishes = JsonConvert.SerializeObject(Dishes, Formatting.Indented);
            using (var fs = File.Create(_dishesPath))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newDishes);
            }
            OnDishesChanged();
        }

        public void AddDayToRegime(Day day)
        {
            if (!(Regime is List<Day> list)) return;
            list.Add(day);
            SaveRegime();
            OnRegimeChanged();
        }

        void SaveRegime()
        {
            string newRegime = JsonConvert.SerializeObject(Regime, Formatting.Indented);
            using (var fs = File.Create(_regimePath))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newRegime);
            }
        }

        public void UpdateDay(Day day)
        {
            if (!(Regime is List<Day> list)) return;
            var itm = list.Find(i => i.Id == day.Id);
                itm.Caption = day.Caption;
            SaveRegime();
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

        private string _ingredientsPath = String.Empty;
        public bool LoadIngredientsFrom(string path)
        {
            var json = LoadJsonFrom<Ingredient>(path);
            if (json == null) return false;
            Ingredients = json;
            _ingredientsPath = path;
            return true;
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
