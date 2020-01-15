using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
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
    public class IngredientsController : ControllerBase
    {
        private readonly IIngredientsRepository _ingredientsRepository;
        private readonly IMapper _mapper;

        public IngredientsController(IIngredientsRepository ingredientsRepository, IMapper mapper)
        {
            _ingredientsRepository = ingredientsRepository;
            _mapper = mapper;
        }
        [HttpGet]
        public ActionResult<IEnumerable<Ingredient>> Get()
        {
            var list = _ingredientsRepository.GetIngredients();
            var dest = _mapper.Map<IReadOnlyList<Domain.Ration.Entities.Ingredient>, Ingredient[]>(list);
            return dest;
        }
    }
}