using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PassPast.Web.Infrastructure.Entities;
using OpenIddict;
using PassPast.Data;
using PassPast.Data.Domain;

namespace PassPast.Web
{
    public class ApplicationDbContext : OpenIddictDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options) { }

        public DbSet<ExternalAccount> ExternalAccounts { get; set; }

        public DbSet<AnswerEntity> Answers { get; set; }
        public DbSet<AnswerTypeEntity> AnswerTypes { get; set; }
        public DbSet<CommentEntity> Comments { get; set; }
        public DbSet<CourseEntity> Courses { get; set; }
        public DbSet<ExamEntity> Exams { get; set; }
        public DbSet<PaperEntity> Papers { get; set; }
        public DbSet<QuestionEntity> Questions { get; set; }
        public DbSet<VoteEntity> Votes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            //OpenIddict
            builder.Entity<OpenIddictApplication>().ToTable("Identity_Applications");
            builder.Entity<OpenIddictAuthorization>().ToTable("Identity_Authorizations");
            builder.Entity<OpenIddictScope>().ToTable("Identity_Scopes");
            builder.Entity<OpenIddictToken>().ToTable("Identity_Tokens");
            builder.Entity<ExternalAccount>().ToTable("Identity_ExternalAccounts");

            //Identity
            builder.Entity<ApplicationUser>().ToTable("Identity_Users");
            builder.Entity<IdentityRole<string>>().ToTable("Identity_Roles");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("Identity_RoleClaims");
            builder.Entity<IdentityUserRole<string>>().ToTable("Identity_UserRoles");
            builder.Entity<IdentityUserLogin<string>>().ToTable("Identity_UserLogins");
            builder.Entity<IdentityUserClaim<string>>().ToTable("Identity_UserClaims");
            builder.Entity<IdentityUserToken<string>>().ToTable("Identity_UserTokens");

            //Domain
            builder.Entity<AnswerEntity>().ToTable("Answers");
            builder.Entity<AnswerTypeEntity>().ToTable("AnswerTypes");
            builder.Entity<CourseEntity>().ToTable("Courses");
            builder.Entity<ExamEntity>().ToTable("Exams");
            builder.Entity<PaperEntity>().ToTable("Papers");
            builder.Entity<QuestionEntity>().ToTable("Questions");
            builder.Entity<VoteEntity>().ToTable("Votes");

            //Mappings
            builder.Entity<CommentEntity>().HasOne(x => x.CreatedBy);
            builder.Entity<ExamEntity>().HasOne(x => x.CreatedBy).WithMany(x => x.ExamsCreated);//.casWillCascadeOnDelete(false);
            builder.Entity<VoteEntity>().HasOne(x => x.VotedBy);

        }
    }
}
