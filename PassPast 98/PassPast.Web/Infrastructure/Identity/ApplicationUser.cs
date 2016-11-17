using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using PassPast.Web.Infrastructure.Entities;
using PassPast.Data;
using PassPast.Data.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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

        public DateTimeOffset CreateAt { get; set; }

        public ICollection<ExamEntity> ExamsCreated { get; set; }
        public ICollection<CommentEntity> CommentsCreated { get; set; }
        public ICollection<VoteEntity> Votes { get; set; }
        public ICollection<ExternalAccount> ExternalAccounts { get; set; }
    }
}
