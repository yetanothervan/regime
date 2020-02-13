using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Domain.Ration.MealType;
using Domain.Ration.RationDay;
using Domain.SharedKernel;
using Infrastructure.Interfaces;
using Newtonsoft.Json;

namespace Infrastructure.GitStorage
{
    public class MealTypesManager : IMealTypesManager
    {
        private readonly IConfiguration _configuration;

        public MealTypesManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public MealType UpdateMealType(MealType mealType)
        {
            var mealTypes = GetMealTypes();
            if (mealType.Id != Guid.Empty)
            {
                var toUpdate = mealTypes.FirstOrDefault(i => i.Id == mealType.Id);
                if (toUpdate != null)
                {
                    mealTypes.Remove(toUpdate);
                    mealTypes.Add(mealType);
                }

                SaveMealTypes(mealTypes);
                return mealType;
            }

            // mealType.Id == Guid.Empty

            var newMealType = new MealType(Guid.NewGuid());
            newMealType.CopyPropertiesFrom(mealType);
            mealTypes.Add(newMealType);

            SaveMealTypes(mealTypes);
            return newMealType;

        }

        public string DeleteMealType(Guid id)
        {
            if (id == Guid.Empty) return "Wrong identifier";

            var days = GetDays();
            var first = days.FirstOrDefault(d => d.Meals?.Any(i => i.MealType?.Id == id) != null);
            if (first != null)
                return $"Cannot delete. Day {first.Caption} contains this meal type";

            var mealTypes = GetMealTypes();
            var toDelete = mealTypes.FirstOrDefault(i => i.Id == id);
            if (toDelete == null)
                return "There is an error in deleting meal type";

            mealTypes.Remove(toDelete);
            SaveMealTypes(mealTypes);
            return "";

        }

        private void SaveMealTypes(List<MealType> mealTypes)
        {
            var newMealTypes = JsonConvert.SerializeObject(mealTypes, Formatting.Indented);
            var path = Path.Combine(_configuration.Folder, _configuration.MealTypesFile);
            using (var fs = File.Create(path))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newMealTypes);
            }
        }

        private List<MealType> GetMealTypes()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.MealTypesFile);
            var list = JsonUtilities.LoadJsonFrom<MealType>(path);
            return list ?? new List<MealType>();
        }

        private List<RationDay> GetDays()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.DaysFile);
            var list = JsonUtilities.LoadJsonFrom<RationDay>(path);
            return list ?? new List<RationDay>();
        }
    }
}
