using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Dtos;
using MediatR;

namespace WebApi.Commands
{
    public class UpdateDayCommand : IRequest<RationDay>
    {
        public RationDay RationDay { get; }

        public UpdateDayCommand(RationDay rationDay)
        {
            RationDay = rationDay;
        }
    }
}
