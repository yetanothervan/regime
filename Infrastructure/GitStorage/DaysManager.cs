using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Domain.Ration.Dish;
using Domain.Ration.RationDay;
using Domain.SharedKernel;
using Infrastructure.Interfaces;
using Newtonsoft.Json;

namespace Infrastructure.GitStorage
{
    public class DaysManager : IDaysManager
    {
        private readonly IConfiguration _configuration;

        public DaysManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public RationDay UpdateDay(RationDay day)
        {
            var days = GetDays();
            if (day.Id != Guid.Empty)
            {
                var toUpdate = days.FirstOrDefault(i => i.Id == day.Id);
                if (toUpdate != null)
                {
                    days.Remove(toUpdate);
                    days.Add(day);
                }

                SaveDays(days);
                return day;
            }

            // Day.Id == Guid.Empty

            var newDay = new RationDay(Guid.NewGuid());
            newDay.CopyPropertiesFrom(day);
            days.Add(newDay);

            SaveDays(days);
            return newDay;
        }

        public string DeleteDay(Guid id)
        {
            if (id == Guid.Empty) return "Wrong identifier";

            var days = GetDays();
            var toDelete = days.FirstOrDefault(i => i.Id == id);
            if (toDelete == null)
                return "There is an error in deleting day";

            days.Remove(toDelete);
            SaveDays(days);
            return "";
        }

        private void SaveDays(List<RationDay> days)
        {
            var newDays = JsonConvert.SerializeObject(days, Formatting.Indented);
            var path = Path.Combine(_configuration.Folder, _configuration.DaysFile);
            using (var fs = File.Create(path))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newDays);
            }
        }

        private List<RationDay> GetDays()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.DaysFile);
            var list = JsonUtilities.LoadJsonFrom<RationDay>(path);
            return list ?? new List<RationDay>();
        }
    }
}
