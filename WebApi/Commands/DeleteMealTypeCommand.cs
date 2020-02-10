using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MediatR;


namespace WebApi.Commands
{
    public class DeleteMealTypeCommand : IRequest<string>
    {
        public Guid MealTypeId { get; }

        public DeleteMealTypeCommand(Guid mealTypeId)
        {
            MealTypeId = mealTypeId;
        }
    }
}
