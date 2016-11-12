using OAuthAPI.WebApi.Api;
using PassPast.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace PassPast.Web.Api.Papers
{
    public class PapersController : BaseApiController
    {
        private PapersManager _papersManager;
        public PapersController()
        {
            _papersManager = new PapersManager();
        }

        public async Task<IHttpActionResult> GetAll()
        {
            var courses = await _papersManager.GetAll();

            return Ok(courses);
        }

        public async Task<IHttpActionResult> Create(PaperBindingModel course)
        {
            var newCourse = _mapper.Map<PaperEntity>(course);

            await _papersManager.Create(newCourse);

            return Ok(newCourse);
        }
    }
}