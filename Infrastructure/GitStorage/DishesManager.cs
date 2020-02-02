﻿using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Domain.Ration.Dish;
using Domain.SharedKernel;
using Infrastructure.Interfaces;
using Newtonsoft.Json;

namespace Infrastructure.GitStorage
{
    public class DishesManager : IDishesManager
    {
        private readonly IConfiguration _configuration;
        public DishesManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Dish UpdateDish(Dish dish)
        {
            var dishes = GetDishes();
            if (dish.Id != Guid.Empty)
            {
                var toUpdate = dishes.FirstOrDefault(i => i.Id == dish.Id);
                if (toUpdate != null)
                {
                    dishes.Remove(toUpdate);
                    dishes.Add(dish);
                }

                SaveDishes(dishes);
                return dish;
            }

            // Dish.Id == Guid.Empty

            var newDish = new Dish(Guid.NewGuid());
            newDish.CopyPropertiesFrom(dish);
            dishes.Add(newDish);
            
            SaveDishes(dishes);
            return newDish;
        }

        private void SaveDishes(List<Dish> dishes)
        {
            var newDishes = JsonConvert.SerializeObject(dishes, Formatting.Indented);
            var path = Path.Combine(_configuration.Folder, _configuration.DishesFile);
            using (var fs = File.Create(path))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newDishes);
            }
        }

        private List<Dish> GetDishes()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.DishesFile);
            var list = JsonUtilities.LoadJsonFrom<Dish>(path);
            return list ?? new List<Dish>();
        }
    }
}