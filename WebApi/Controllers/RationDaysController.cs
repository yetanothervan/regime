﻿using System;
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
    public class RationDaysController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMediator _mediator;
        private readonly IDaysRepository _daysRepository;


        public RationDaysController(IMapper mapper, IMediator mediator, IDaysRepository daysRepository)
        {
            _mapper = mapper;
            _mediator = mediator;
            _daysRepository = daysRepository;
        }
        [HttpGet]
        public ActionResult<IEnumerable<RationDay>> Get()
        {
            var list = _daysRepository.GetDays();
            var dest = _mapper.Map<IReadOnlyList<Domain.Ration.RationDay.RationDay>, RationDay[]>(list);
            return dest;
        }

        [HttpPost("update-day")]
        public async Task<ActionResult<RationDay>> UpdateDay(RationDay day)
        {
            var updateCommand = new UpdateDayCommand(day);
            var response = await _mediator.Send(updateCommand);
            return Ok(response);
        }

        [HttpPost("delete-day")]
        public async Task<ActionResult<string>> DeleteDay([FromBody]Guid id)
        {
            var deleteCommand = new DeleteDayCommand(id);
            var response = await _mediator.Send(deleteCommand);
            return string.IsNullOrEmpty(response)
                ? (ActionResult<string>)Ok(id)
                : BadRequest(response);
        }
    }
}