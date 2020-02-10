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
    public class DeleteDayCommandHandler : IRequestHandler<DeleteDayCommand, string>
    {
        private readonly IMapper _mapper;
        private readonly IDaysManager _daysManager;

        public DeleteDayCommandHandler(IMapper mapper, IDaysManager daysManager)
        {
            _mapper = mapper;
            _daysManager = daysManager;
        }

        public Task<string> Handle(DeleteDayCommand request, CancellationToken cancellationToken)
        {
            var result = _daysManager.DeleteDay(request.RationDayId);
            return Task.FromResult(result);
        }
    }
}
