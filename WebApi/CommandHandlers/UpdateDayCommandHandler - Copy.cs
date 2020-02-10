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
    public class UpdateMealTypeCommandHandler : IRequestHandler<UpdateMealTypeCommand, MealType>
    {
        private readonly IMealTypesManager _manager;
        private readonly IMapper _mapper;

        public UpdateMealTypeCommandHandler(IMealTypesManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }
        public Task<MealType> Handle(UpdateMealTypeCommand request, CancellationToken cancellationToken)
        {
            var domMealType = _mapper.Map<Domain.Ration.MealType.MealType>(request.MealType);
            var result = _manager.UpdateMealType(domMealType);

            var dtoMealType = _mapper.Map<MealType>(result);
            return Task.FromResult(dtoMealType);
        }
    }
}
