using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using OAuthAPI.WebApi.Api;
using PassPast.Data;
using PassPast.Web.Api.Papers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PassPast.Web.Api.Papers
{
    public class PapersController : Controller
    {
        private IPaperManager _papersManager;
        private IMapper _mapper;

        public PapersController(IMapper mapper, IPaperManager paperManager)
        {
            _mapper = mapper;
            _papersManager = paperManager;
        }

        public async Task<IActionResult> Get(int id)
        {
            var course = await _papersManager.Get(id);

            return Ok(course);
        }

        public async Task<IActionResult> GetAll()
        {
            var courses = await _papersManager.GetAll();

            return Ok(courses);
        }

        public async Task<IActionResult> Create(PaperBindingModel course)
        {
            var newCourse = _mapper.Map<PaperEntity>(course);

            await _papersManager.Create(newCourse);

            return Ok(newCourse);
        }
    }
}