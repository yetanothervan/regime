using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.Interfaces;
using MediatR;
using WebApi.Commands;

namespace WebApi.CommandHandlers
{
    public class DeleteIngredientCommandHandler : IRequestHandler<DeleteIngredientCommand, string>
    {
        private readonly IMapper _mapper;
        private readonly IIngredientsManager _manager;

        public DeleteIngredientCommandHandler(IMapper mapper, IIngredientsManager ingredientsManager)
        {
            _mapper = mapper;
            _manager = ingredientsManager;
        }

        public Task<string> Handle(DeleteIngredientCommand request, CancellationToken cancellationToken)
        {
            var result = _manager.DeleteIngredient(request.IngredientId);
            return Task.FromResult(result);
        }
    }
}
