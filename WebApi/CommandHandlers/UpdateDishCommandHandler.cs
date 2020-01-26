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
    public class UpdateDishCommandHandler : IRequestHandler<UpdateDishCommand, Dish>
    {
        private readonly IDishesManager _manager;
        private readonly IMapper _mapper;

        public UpdateDishCommandHandler(IDishesManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }
        public Task<Dish> Handle(UpdateDishCommand request, CancellationToken cancellationToken)
        {
            var domDish = _mapper.Map<Domain.Ration.Dish.Dish>(request.Dish);
            var result = _manager.UpdateDish(domDish);

            var dtoDish = _mapper.Map<Dish>(result);
            return Task.FromResult(dtoDish);
        }
    }
}
