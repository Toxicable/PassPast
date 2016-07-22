using System.Collections.Generic;
using System.Web.Http;

namespace PassPast.Api
{
    //an example web api controller, showing the different types of requests you can make with the differernt methods
    //Use this when you want to request data with JS
    public class ValuesController : ApiController
    {
        // GET api/values/Get
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/values/Get/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values/Post
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/Put/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/Delete/5
        public void Delete(int id)
        {
        }
    }
}
