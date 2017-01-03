using System;
using System.Collections.Generic;
using System.Linq;


namespace PassPast.Web.Api.Papers
{
    public class PaperViewModel
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int CourseId { get; set; }
    }
}