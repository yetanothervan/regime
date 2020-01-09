using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Windows.Media;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;
using Regime.Win.DayControl;
using Regime.Win.MealTypeDlg;
using Regime.Win.Models;
using Regime.Win.Services;

namespace Regime.Win.MealControl
{
    public class MealControlVM : BindableBase
    {
        private readonly DataProviderService _dataProvider;
        private decimal _portion;
        private DishViewModel _selectedDishViewModel;
        public MealViewModel Meal { get; set; }
        public List<DishViewModel> Dishes { get; set; }
        private DayControlVM MyDay { get; set; }
        
        public MealControlVM(DataProviderService dataProvider, DayControlVM myDay, Meal meal)
        {
            _dataProvider = dataProvider;
            MyDay = myDay;
            Dishes = Util.LoadDishesIncludedIngredients(_dataProvider);
            _selectedDishViewModel = Dishes.FirstOrDefault();

            _dataProvider.DishesChanged += (sender, args) =>
            {
                Dishes = Util.LoadDishesIncludedIngredients(_dataProvider);
                ComboUpdate();
            };
            Meal = new MealViewModel()
            {
                MealType = _dataProvider.MealTypes.FirstOrDefault(m => m.Id == meal.MealTypeId),
                Person = _dataProvider.Persons.FirstOrDefault(p => p.Id == meal.PersonId),
                Items = new ObservableCollection<MealItemViewModel>
                    (meal.Items.Select(i => new MealItemViewModel()
                {
                    Dish = Dishes.FirstOrDefault(d=> d.Dish.Id == i.DishId),
                    Portion = i.Portion
                }))
            };
            Portion = 1.0m;
            SetupCommands();
        }

        private void SetupCommands()
        {
            SelectTypeCommand = new DelegateCommand(() =>
            {
                var dlgModel = new MealTypeDlgVM(_dataProvider);
                if (Meal.Person != null) dlgModel.Person = Meal.Person;
                if (Meal.MealType != null) dlgModel.MealType = Meal.MealType;

                var dlg = new MealTypeDlg.MealTypeDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    Meal.Person = dlgModel.Person;
                    Meal.MealType = dlgModel.MealType;
                    MyDay.SaveDay();
                    UpdateSummary();
                }
            });
            AddDishCommand = new DelegateCommand(() =>
            {
                Meal.Items.Add(new MealItemViewModel()
                {
                    Dish = _selectedDishViewModel,
                    Portion = Portion
                });
                MyDay.SaveDay();
                UpdateSummary();
            });
            DeleteMealItemCommand = new DelegateCommand<MealItemViewModel>(item =>
            {
                Meal.Items.Remove(item);
                MyDay.SaveDay();
                UpdateSummary();
            });
        }


        public decimal Portion
        {
            get => _portion;
            set
            {
                SetProperty(ref _portion, value);
                RaisePropertyChanged(nameof(DishSummary));
            }
        }

        public string DishSummary
        {
            get
            {
                if (SelectedDishViewModel == null) return "";
                var d = SelectedDishViewModel;
                return $"ККал: {d.TotalKkal * Portion:F}, Блк: {d.TotalProtein * Portion:F}, Жир: {d.TotalFat * Portion:F}, Угл: {d.TotalCarbon * Portion:F}";
            }
            private set
            {
            }
        }

        public decimal TotalKkal => Meal.Items.Sum(i => i.KKal);
        public decimal TotalProtein => Meal.Items.Sum(i => i.Protein);
        public decimal TotalFat => Meal.Items.Sum(i => i.Fat);
        public decimal TotalCarbon => Meal.Items.Sum(i => i.Carbon);

        public decimal TotalNutrients
        {
            get
            {
                var total = TotalProtein + TotalFat + TotalCarbon;
                return total == 0 ? -1 : total;
            }
        }

        public decimal TotalKkalProtein => TotalKkal / TotalNutrients * TotalProtein;
        public decimal TotalKkalFat => TotalKkal / TotalNutrients * TotalFat;
        public decimal TotalKkalCarbon => TotalKkal / TotalNutrients * TotalCarbon;

        public string TotalKkalString => $"ККал: {TotalKkal:F}/{Meal.MealType.KkalTotal}";
        public string TotalKkalProteinString 
            => $"ККал * Блк: {TotalKkalProtein:F} / {Meal.MealType.ProteinMax}";
        public string TotalKkalFatString
            => $"ККал * Жир: {TotalKkalFat:F} / {Meal.MealType.FatMax}";
        public string TotalKkalCarbonString
            => $"ККал * Угл: {TotalKkalCarbon:F} / {Meal.MealType.CarbonMax}";

        private void UpdateSummary()
        {
            RaisePropertyChanged(nameof(TotalKkalString));
            RaisePropertyChanged(nameof(TotalKkalProteinString));
            RaisePropertyChanged(nameof(TotalKkalFatString));
            RaisePropertyChanged(nameof(TotalKkalCarbonString));
            RaisePropertyChanged(nameof(TotalKkal));
            RaisePropertyChanged(nameof(TotalKkalProtein));
            RaisePropertyChanged(nameof(TotalKkalFat));
            RaisePropertyChanged(nameof(TotalKkalCarbon));
            RaisePropertyChanged(nameof(KkalBrush));
            RaisePropertyChanged(nameof(KkalProteinBrush));
            RaisePropertyChanged(nameof(KkalFatBrush));
            RaisePropertyChanged(nameof(KkalCarbonBrush));
        }

        public Brush KkalBrush => TotalKkal > Meal.MealType.KkalTotal ? Brushes.Red : Brushes.Black;
        public Brush KkalProteinBrush => TotalKkalProtein > Meal.MealType.ProteinMax ? Brushes.Red : Brushes.Black;
        public Brush KkalFatBrush => TotalKkalFat > Meal.MealType.FatMax ? Brushes.Red : Brushes.Black;
        public Brush KkalCarbonBrush => TotalKkalCarbon > Meal.MealType.CarbonMax ? Brushes.Red : Brushes.Black;

        public DishViewModel SelectedDishViewModel
        {
            get => _selectedDishViewModel;
            set
            {
                SetProperty(ref _selectedDishViewModel, value);
                RaisePropertyChanged(nameof(DishSummary));
            }
        }
        
        public DelegateCommand SelectTypeCommand { get; set; }
        public DelegateCommand AddDishCommand { get; set; }
        public DelegateCommand<MealItemViewModel> DeleteMealItemCommand { get; set; }
        public Action ComboUpdate { get; set; }
    }
    
    public class MealItemViewModel
    {
        public DishViewModel Dish { get; set; }
        public decimal Portion { get; set; }

        public string Caption
        {
            get => $"{Portion} X {Dish.Dish.Caption} ({Dish.GetMultiplyedIngredientStr(Portion)})";
            set { }
        }

        public decimal KKal => Dish.TotalKkal * Portion;
        public decimal Protein => Dish.TotalProtein * Portion;
        public decimal Fat => Dish.TotalFat * Portion;
        public decimal Carbon => Dish.TotalCarbon * Portion;
            
        public string Summary {
            get => 
                $"ККал: {KKal:F}, Блк: {Protein:F}, Жир: {Fat:F}, Угл: {Carbon:F}";
            set { }
        }
    }

    public class MealViewModel : BindableBase
    {
        public ObservableCollection<MealItemViewModel> Items { get; set; }

        public MealViewModel()
        {
        }

        private Person _person;
        private MealType _mealType;

        public Person Person
        {
            get => _person;
            set => SetProperty(ref _person, value);
        }

        public MealType MealType
        {
            get => _mealType;
            set => SetProperty(ref _mealType, value);
        }
    }
}
