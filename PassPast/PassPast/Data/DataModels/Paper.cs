using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace PassPast.Data.DataModels
{
    public class Paper : BaseDataModel
    {
        public string Name { get; set; }
        public Course Course { get; set; }
        public ICollection<Exam> Exams { get; set; }
		public User CreatedBy { get; set; }
	}
}