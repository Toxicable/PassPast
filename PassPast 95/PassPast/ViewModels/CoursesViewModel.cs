using PassPast.Data.DataModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.ViewModels
{
    public class CoursesViewModel
    {
        public ICollection<Course> Courses { get; set; } 
    }
}