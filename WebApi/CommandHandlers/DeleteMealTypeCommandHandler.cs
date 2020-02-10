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
    public class DeleteMealTypeCommandHandler : IRequestHandler<DeleteMealTypeCommand, string>
    {
        private readonly IMapper _mapper;
        private readonly IMealTypesManager _manager;

        public DeleteMealTypeCommandHandler(IMapper mapper, IMealTypesManager manager)
        {
            _mapper = mapper;
            _manager = manager;
        }

        public Task<string> Handle(DeleteMealTypeCommand request, CancellationToken cancellationToken)
        {
            var result = _manager.DeleteMealType(request.MealTypeId);
            return Task.FromResult(result);
        }
    }
}
