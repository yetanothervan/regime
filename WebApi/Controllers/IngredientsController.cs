using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientsRepository _ingredientsRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public IngredientsController(IIngredientsRepository ingredientsRepository, IMapper mapper, IMediator mediator)
        {
            _ingredientsRepository = ingredientsRepository;
            _mapper = mapper;
            _mediator = mediator;
        }
        
        [HttpGet]
        public ActionResult<IEnumerable<Ingredient>> Get()
        {
            var list = _ingredientsRepository.GetIngredients();
            var dest = _mapper.Map<IReadOnlyList<Domain.Ration.Ingredient.Ingredient>, Ingredient[]>(list);
            return dest;
        }

        [HttpPost("update-ingredient")]
        public async Task<ActionResult<Ingredient>> UpdateIngredient(Ingredient ingredient)
        {
            var updateCommand = new UpdateIngredientCommand(ingredient);
            var response = await _mediator.Send(updateCommand);
            return Ok(response);
        }
    }
}