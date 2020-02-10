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
    public class UpdateDayCommandHandler : IRequestHandler<UpdateDayCommand, RationDay>
    {
        private readonly IDaysManager _manager;
        private readonly IMapper _mapper;

        public UpdateDayCommandHandler(IDaysManager manager, IMapper mapper)
        {
            _manager = manager;
            _mapper = mapper;
        }
        public Task<RationDay> Handle(UpdateDayCommand request, CancellationToken cancellationToken)
        {
            var domDay = _mapper.Map<Domain.Ration.RationDay.RationDay>(request.RationDay);
            var result = _manager.UpdateDay(domDay);

            var dtoDay = _mapper.Map<RationDay>(result);
            return Task.FromResult(dtoDay);
        }
    }
}
