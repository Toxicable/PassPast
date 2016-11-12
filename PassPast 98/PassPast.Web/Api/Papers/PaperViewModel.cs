using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Web.Api.Papers
{
    public class PaperViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CourseId { get; set; }
    }
}