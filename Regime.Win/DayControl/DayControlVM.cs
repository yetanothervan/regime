using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prism.Commands;
using Regime.Domain;
using Regime.Win.MealControl;
using Regime.Win.MealTypeDlg;
using Regime.Win.Services;
using BindableBase = Prism.Mvvm.BindableBase;

namespace Regime.Win.DayControl
{
    public class DayControlVM : BindableBase
    {
        private readonly DataProviderService _dataProvider;
        private Day _day;
        private string _dayCaption;

        public DayControlVM(DataProviderService dataProvider, Day day)
        {
            _dataProvider = dataProvider;
            LoadDay(day);
            SetupCommands();
        }

        private void LoadDay(Day day)
        {
            _day = day;
            _dayCaption = _day.Caption;
            Meals = new ObservableCollection<MealControlVM>(_day.Meals.Select(m =>
                new MealControlVM(_dataProvider, this, m)));
        }

        private void SetupCommands()
        {
            AddMealCommand = new DelegateCommand(() =>
            {
                var dlgModel = new MealTypeDlgVM(_dataProvider)
                {
                    Person = _dataProvider.Persons.FirstOrDefault(),
                    MealType = _dataProvider.MealTypes.FirstOrDefault()
                };

                var dlg = new MealTypeDlg.MealTypeDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    Meals.Add(new MealControlVM(_dataProvider, this, new Meal()
                    {
                        PersonId = dlgModel.Person.Id,
                        MealTypeId = dlgModel.MealType.Id,
                    }));
                    SaveDay();
                }
            });
        }

        public void SaveDay()
        {
            _day.Caption = DayCaption;
            _day.Meals = new List<Meal>(Meals.Select(m => new Meal()
            {
                MealTypeId = m.Meal.MealType.Id,
                PersonId = m.Meal.Person.Id,
                Items = m.Meal.Items.Select(i => new MealItem()
                {
                    Portion = i.Portion,
                    DishId = i.Dish.Dish.Id
                }).ToList()

            }));
            _dataProvider.UpdateDay(_day);
            Recalc();
        }

        private void Recalc()
        {
            RaisePropertyChanged(nameof(DaySummary));
        }

        public string DaySummary
        {
            get
            {
                var sb = new StringBuilder();
                sb.AppendLine("Баланс:");
                var persons = Meals.Select(m => m.Meal.Person).Distinct().ToList();
                foreach (var person in persons)
                {
                    var total = Meals.Where(p=>p.Meal.Person.Id==person.Id).Sum(i => i.TotalKkal);
                    var target = person.KkalTarget;
                    sb.AppendLine($"{person.Name}: ККал: {total:F} / {target:F} ({target - total:F})");
                }

                return sb.ToString();
            }
            set { }
        }

        public ObservableCollection<MealControlVM> Meals { get; set; }

        public DelegateCommand AddMealCommand { get; set; }
        
        public string DayCaption
        {
            get => _dayCaption;
            set
            {
                SetProperty(ref _dayCaption, value);
                SaveDay();
            }
        }
    }
}
