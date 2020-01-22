using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using Domain.Ration.Ingredient;
using Domain.SharedKernel;
using Infrastructure.Interfaces;
using Newtonsoft.Json;

namespace Infrastructure.GitStorage
{
    public class IngredientsManager : IIngredientsManager
    {
        private readonly IConfiguration _configuration;
        public IngredientsManager(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public Ingredient UpdateIngredient(Ingredient ingredient)
        {
            var ingredients = GetIngredients();
            if (ingredient.Id != Guid.Empty)
            {
                var toUpdate = ingredients.FirstOrDefault(i => i.Id == ingredient.Id);
                if (toUpdate != null)
                {
                    ingredients.Remove(toUpdate);
                    ingredients.Add(ingredient);
                }

                SaveIngredients(ingredients);
                return ingredient;
            }

            // ingredient.Id == Guid.Empty

            var newIngredient = new Ingredient(Guid.NewGuid());
            newIngredient.CopyPropertiesFrom(ingredient);
            ingredients.Add(newIngredient);
            
            SaveIngredients(ingredients);
            return newIngredient;
        }

        private void SaveIngredients(List<Ingredient> ingredients)
        {
            var newIngs = JsonConvert.SerializeObject(ingredients, Formatting.Indented);
            var path = Path.Combine(_configuration.Folder, _configuration.IngredientsFile);
            using (var fs = File.Create(path))
            using (var sw = new StreamWriter(fs))
            {
                sw.Write(newIngs);
            }
        }

        private List<Ingredient> GetIngredients()
        {
            var path = Path.Combine(_configuration.Folder, _configuration.IngredientsFile);
            var list = JsonUtilities.LoadJsonFrom<Ingredient>(path);
            return list ?? new List<Ingredient>();
        }
    }
}
