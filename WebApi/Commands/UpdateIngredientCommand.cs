using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Dtos;
using MediatR;

namespace WebApi.Commands
{
    public class UpdateIngredientCommand : IRequest<Ingredient>
    {
        public UpdateIngredientCommand(Ingredient ingredient)
        {
            Ingredient = ingredient;
        }
        public Ingredient Ingredient { get; }
    }
}
