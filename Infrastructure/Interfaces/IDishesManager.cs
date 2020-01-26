using System;
using System.Collections.Generic;
using System.Text;
using Domain.Ration.Dish;

namespace Infrastructure.Interfaces
{
    public interface IDishesManager
    {
        Dish UpdateDish(Dish dish);
    }
}
