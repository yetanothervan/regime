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
    public class MealTypesController : ControllerBase
    {
        private readonly IMealTypesRepository _mealTypesRepository;
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;

        public MealTypesController(IMealTypesRepository mealTypesRepository, IMapper mapper, IMediator mediator)
        {
            _mealTypesRepository = mealTypesRepository;
            _mapper = mapper;
            _mediator = mediator;
        }

        [HttpGet]
        public ActionResult<IEnumerable<MealType>> Get()
        {
            var list = _mealTypesRepository.GetMealTypes();
            var dest = _mapper.Map<IReadOnlyList<Domain.Ration.MealType.MealType>, MealType[]>(list);
            return dest;
        }

        [HttpPost("update-mealtype")]
        public async Task<ActionResult<MealType>> UpdateMealType(MealType mealType)
        {
            var updateCommand = new UpdateMealTypeCommand(mealType);
            var response = await _mediator.Send(updateCommand);
            return Ok(response);
        }

        [HttpPost("delete-mealtype")]
        public async Task<ActionResult<string>> DeleteMealType([FromBody]Guid id)
        {
            var deleteCommand = new DeleteMealTypeCommand(id);
            var response = await _mediator.Send(deleteCommand);
            return string.IsNullOrEmpty(response)
                ? (ActionResult<string>)Ok(id)
                : BadRequest(response);
        }
    }
}