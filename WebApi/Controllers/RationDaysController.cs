using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Infrastructure.Dtos;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RationDaysController : ControllerBase
    {
        [HttpGet]
        public ActionResult<IEnumerable<RationDay>> Get()
        {
            return new RationDay[]
            {
                new RationDay()
                {
                    Caption = "The day one",
                    Id = Guid.NewGuid()
                },
                new RationDay()
                {
                    Caption = "The day two",
                    Id = Guid.NewGuid()
                }
            };
        }
    }
}