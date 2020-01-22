using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.Dtos;
using Infrastructure.Interfaces;
using MediatR;
using WebApi.Commands;

namespace WebApi.CommandHandlers
{
    public class UpdateIngredientCommandHandler : IRequestHandler<UpdateIngredientCommand, Ingredient>
    {
        private readonly IIngredientsManager _manager;
        private readonly IMapper _mapper;

        public UpdateIngredientCommandHandler(IIngredientsManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }
        public Task<Ingredient> Handle(UpdateIngredientCommand request, CancellationToken cancellationToken)
        {
            var domIngredient = _mapper.Map<Domain.Ration.Ingredient.Ingredient>(request.Ingredient);
            var result = _manager.UpdateIngredient(domIngredient);

            var dtoIngredient = _mapper.Map<Ingredient>(result);
            return Task.FromResult(dtoIngredient);
        }
    }
}
