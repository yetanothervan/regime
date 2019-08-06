using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using Prism.Commands;
using Regime.Domain;
using Regime.Win.Services;

namespace Regime.Win.MealTypeDlg
{
    public class MealTypeDlgVM
    {
        public List<Person> Persons { get; set; }
        public List<MealType> MealTypes { get; set; }

        public MealTypeDlgVM(DataProviderService dataProvider)
        {
            OkButtonCommand = new DelegateCommand<Window>(wnd =>
            {
                wnd.DialogResult = true;
                wnd.Close();
            });
            Persons = dataProvider.Persons.ToList();
            MealTypes = dataProvider.MealTypes.ToList();
            if (Person == null && Persons.Any()) Person = Persons.First();
            if (MealType == null && MealTypes.Any()) MealType = MealTypes.First();
        }

        public Person Person { get; set; }
        public MealType MealType { get; set; }

        public DelegateCommand<Window> OkButtonCommand { get; set; }
    }
}
