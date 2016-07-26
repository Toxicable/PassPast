using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data.DataModels
{
    public class Exam : BaseDataModel
    {
        public int Year { get; set; }
		public string Semester { get; set; }
        public Paper Paper { get; set; }
        public string Type { get; set; }
        public ICollection<Question>Questions { get; set; }
		public User CreatedBy { get; set; }
	}
}