using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Dtos;
using MediatR;

namespace WebApi.Commands
{
    public class UpdateDishCommand : IRequest<Dish>
    {
        public UpdateDishCommand(Dish dish)
        {
            Dish = dish;
        }
        public Dish Dish { get; }
    }
}
