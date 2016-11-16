using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using AutoMapper;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OAuthApi.AuthServer.Controllers
{
    [Route("[controller]")]
    public class ValuesController : Controller
    {
        public ValuesController(IMapper mapper, ApplicationDbContext ctx, IMyService a)
        {

        }

        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public interface IMyService { string GetHi(); }

    public class MyService: IMyService
    {
        public MyService(IMapper mapper, ApplicationDbContext ctx)
        {

        }

        public string GetHi() => "Hi";
    }
}
