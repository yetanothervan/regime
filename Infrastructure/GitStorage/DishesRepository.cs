using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Domain.Ration.Dish;
using Infrastructure.Interfaces;

namespace Infrastructure.GitStorage
{
    public class DishesRepository: IDishesRepository
    {
        private readonly IConfiguration _configuration;

        public DishesRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IReadOnlyList<Dish> GetDishes()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.DishesFile);
            var list = JsonUtilities.LoadJsonFrom<Dish>(path);
            return list ?? new List<Dish>();
        }
    }
}
