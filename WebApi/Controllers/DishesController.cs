using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Infrastructure.Dtos;
using Infrastructure.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using WebApi.Commands;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DishesController : ControllerBase
    {
        private readonly IDishesRepository _dishesRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public DishesController(IDishesRepository dishesRepository, IMapper mapper, IMediator mediator)
        {
            _dishesRepository = dishesRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Dish>> Get()
        {
            var list = _dishesRepository.GetDishes();
            var dest = _mapper.Map<IReadOnlyList<Domain.Ration.Dish.Dish>, Dish[]>(list);
            return dest;
        }

        [HttpPost("update-dish")]
        public async Task<ActionResult<Dish>> UpdateDish(Dish dish)
        {
            var updateCommand = new UpdateDishCommand(dish);
            var response = await _mediator.Send(updateCommand);
            return Ok(response);
        }
    }
}