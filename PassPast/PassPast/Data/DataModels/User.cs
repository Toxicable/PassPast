using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace PassPast.Data.DataModels
{
	public class User : BaseDataModel
	{      
		public string Name { get; set; }
		public string ProviderId { get; set; }
		public string Provider { get; set; }
		public ICollection<Course> CoursesCreated { get; set; }
		public ICollection<Paper> PapersCreated { get; set; }
		public ICollection<Exam> ExamsCreated { get; set; }
		public ICollection<Answer> AnswersCreated { get; set; }
		public ICollection<Answer> AnswersVotedFor { get; set; }
		public ICollection<Comment> CommentsCreated { get; set; }
		public ICollection<Comment> CommentsVotedFor { get; set; }
	}
}