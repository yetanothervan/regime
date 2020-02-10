using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace WebApi.Commands
{
    public class DeleteDayCommand : IRequest<string>
    {
        public Guid RationDayId { get; }

        public DeleteDayCommand(Guid rationDayId)
        {
            RationDayId = rationDayId;
        }
    }
}
