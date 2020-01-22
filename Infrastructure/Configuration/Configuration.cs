using System;
using System.Collections.Generic;
using System.Text;
using Infrastructure.Interfaces;

namespace Infrastructure.Configuration
{
    public class Configuration : IConfiguration
    {
        public string Folder { get; } = "c:\\ext\\git\\share\\food\\";
        public string IngredientsFile { get; } = "ingredients.json";
        public string DishesFile { get; } = "dishes.json";
    }
}
