using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;
using OAuthAPI.Data.Identity;
using PassPast.Data;
using PassPast.Data.Domain;

namespace OAuthAPI.WebApi
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext()
            : base("DefaultConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
            Configuration.LazyLoadingEnabled = false;
        }

        public DbSet<RefreshToken> RefreshTokens { get; set; }
        public DbSet<Client> Clients { get; set; }
        public DbSet<ExternalAccount> ExternalAccounts { get; set; }

        public DbSet<AnswerEntity> Answers {get;set;}
        public DbSet<AnswerTypeEntity> AnswerTypes {get;set;}
        public DbSet<CommentEntity> Comments {get;set;}
        public DbSet<CourseEntity> Courses {get;set;}
        public DbSet<ExamEntity> Exams {get;set;}
        public DbSet<PaperEntity> Papers {get;set;}
        public DbSet<QuestionEntity> Questions {get;set;}
        public DbSet<VoteEntity> Votes {get;set; }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            
            modelBuilder.Entity<CommentEntity>().HasRequired(x => x.CreatedBy);
            modelBuilder.Entity<ExamEntity>().HasRequired(x => x.CreatedBy).WithMany(x => x.ExamsCreated).WillCascadeOnDelete(false);
            modelBuilder.Entity<VoteEntity>().HasRequired(x => x.VotedBy);

        }

    }
}