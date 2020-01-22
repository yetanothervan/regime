using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.Dtos;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishesController : ControllerBase
    {
        private readonly IDishesRepository _dishesRepository;
        private readonly IMapper _mapper;

        public DishesController(IDishesRepository dishesRepository, IMapper mapper)
        {
            _dishesRepository = dishesRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Dish>> Get()
        {
            var list = _dishesRepository.GetDishes();
            var dest = _mapper.Map<IReadOnlyList<Domain.Ration.Dish.Dish>, Dish[]>(list);
            return dest;
        }
    }
}