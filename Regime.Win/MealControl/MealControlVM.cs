using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
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
                RaisePropertyChanged(nameof(MealSummary));
            });
            DeleteMealItemCommand = new DelegateCommand<MealItemViewModel>(item =>
            {
                Meal.Items.Remove(item);
                MyDay.SaveDay();
                RaisePropertyChanged(nameof(MealSummary));
            });
        }


        public decimal Portion
        {
            get => _portion;
            set
            {
                SetProperty(ref _portion, value);
                RaisePropertyChanged(nameof(MealSummary));
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

        public string MealSummary
        {
            get
            {
                var k = Meal.Items.Sum(i => i.KKal);
                var p = Meal.Items.Sum(i => i.Protein);
                var f = Meal.Items.Sum(i => i.Fat);
                var c = Meal.Items.Sum(i => i.Carbon);
                return $"ККал: {k:F}, Блк: {p:F}, Жир: {f:F}, Угл: {c:F}";
            }
            private set { }
        }

        public DishViewModel SelectedDishViewModel
        {
            get => _selectedDishViewModel;
            set
            {
                SetProperty(ref _selectedDishViewModel, value);
                RaisePropertyChanged(nameof(DishSummary));
                RaisePropertyChanged(nameof(MealSummary));
            }
        }
        
        public DelegateCommand SelectTypeCommand { get; set; }
        public DelegateCommand AddDishCommand { get; set; }
        public DelegateCommand<MealItemViewModel> DeleteMealItemCommand { get; set; }
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
