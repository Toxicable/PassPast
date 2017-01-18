using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using PassPast.Web.Infrastructure.Entities;
using PassPast.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PassPast.Web.Infrastructure.Domain;

namespace PassPast.Web
{
    public class ApplicationUser : IdentityUser
    {
        public ApplicationUser()
        {
            ExternalAccounts = new HashSet<ExternalAccount>();
        }
        
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public DateTimeOffset CreatedAt { get; set; }

        public ICollection<CourseEntity> CoursesCreated { get; set; }
        public ICollection<PaperEntity> PapersCreated { get; set; }
        public ICollection<ExamEntity> ExamsCreated { get; set; }
        public ICollection<QuestionEntity> QuestionsCreated { get; set; }
        public ICollection<CommentEntity> CommentsCreated { get; set; }
        public ICollection<AnswerEntity> AnswersCreated { get; set; }
        public ICollection<VoteEntity> VotesCreated { get; set; }

        public ICollection<CourseEntity> CoursesUpdated { get; set; }
        public ICollection<PaperEntity> PapersUpdated { get; set; }
        public ICollection<ExamEntity> ExamsUpdated { get; set; }
        public ICollection<QuestionEntity> QuestionsUpdated { get; set; }
        public ICollection<CommentEntity> CommentsUpdated { get; set; }
        public ICollection<AnswerEntity> AnswersUpdated { get; set; }
        public ICollection<VoteEntity> VotesUpdated { get; set; }


        public ICollection<ExternalAccount> ExternalAccounts { get; set; }
    }
}
