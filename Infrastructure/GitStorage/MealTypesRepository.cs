using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Domain.Ration.MealType;
using Domain.Ration.RationDay;
using Infrastructure.Interfaces;

namespace Infrastructure.GitStorage
{
    public class MealTypesRepository : IMealTypesRepository
    {
        private readonly IConfiguration _configuration;

        public MealTypesRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public List<MealType> GetMealTypes()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.MealTypesFile);
            var list = JsonUtilities.LoadJsonFrom<MealType>(path);
            return list ?? new List<MealType>();
        }
    }
}
