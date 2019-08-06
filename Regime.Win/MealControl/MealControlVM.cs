using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Prism.Commands;
using Prism.Mvvm;
using Regime.Domain;
using Regime.Win.MealTypeDlg;
using Regime.Win.Services;

namespace Regime.Win.MealControl
{
    public class MealControlVM : BindableBase
    {
        private readonly DataProviderService _dataProvider;
        private Person _person;
        private MealType _mealType;

        public MealControlVM(DataProviderService dataProvider)
        {
            _dataProvider = dataProvider;
            SetupCommands();
        }

        private void SetupCommands()
        {
            SelectTypeCommand = new DelegateCommand(() =>
            {
                var dlgModel = new MealTypeDlgVM(_dataProvider);
                if (Person != null) dlgModel.Person = Person;
                if (MealType != null) dlgModel.MealType = MealType;
                
                var dlg = new MealTypeDlg.MealTypeDlg(dlgModel);
                var result = dlg.ShowDialog();
                if (result.HasValue && result == true)
                {
                    Person = dlgModel.Person;
                    MealType = dlgModel.MealType;
                }
            });
        }

        public DelegateCommand SelectTypeCommand { get; set; }

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
