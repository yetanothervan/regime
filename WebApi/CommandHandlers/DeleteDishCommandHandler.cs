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
    public class DeleteDishCommandHandler : IRequestHandler<DeleteDishCommand, string>
    {
        private readonly IMapper _mapper;
        private readonly IDishesManager _manager;

        public DeleteDishCommandHandler(IMapper mapper, IDishesManager dishManager)
        {
            _mapper = mapper;
            _manager = dishManager;
        }

        public Task<string> Handle(DeleteDishCommand request, CancellationToken cancellationToken)
        {
            var result = _manager.DeleteDish(request.DishId);
            return Task.FromResult(result);
        }
    }
}
