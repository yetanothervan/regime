using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;

namespace WebApi.Commands
{
    public class DeleteDishCommand : IRequest<string>
    {
        public Guid DishId { get; }
        
        public DeleteDishCommand(Guid dishId)
        {
            DishId = dishId;
        }
    }
}
