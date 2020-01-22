using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using Domain.Ration.Ingredient;
using Infrastructure.Interfaces;

namespace Infrastructure.GitStorage
{
    public class IngredientsRepository : IIngredientsRepository
    {
        private readonly IConfiguration _configuration;

        public IngredientsRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }
        public IReadOnlyList<Ingredient> GetIngredients()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.IngredientsFile);
            var list = JsonUtilities.LoadJsonFrom<Ingredient>(path);
            return list ?? new List<Ingredient>();
        }
    }
}
