using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PassPast.Web.Infrastructure.Entities;
using OpenIddict;
using PassPast.Data;
using PassPast.Data.Domain;
using PassPast.Web.Infrastructure.Domain;
using Microsoft.EntityFrameworkCore.Metadata;
using System;

namespace PassPast.Web
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions options)
            : base(options) { }

        public DbSet<ExternalAccount> ExternalAccounts { get; set; }

        public DbSet<AnswerEntity> Answers { get; set; }
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
            // builder.Entity<OpenIddictApplication>().ToTable("_AuthApplications");
            // builder.Entity<OpenIddictAuthorization>().ToTable("_AuthAuthorizations");
            // builder.Entity<OpenIddictScope>().ToTable("_AuthScopes");
            // builder.Entity<OpenIddictToken>().ToTable("_AuthTokens");
            builder.Entity<ExternalAccount>().ToTable("_AuthExternalAccounts");

            //Identity
            builder.Entity<ApplicationUser>().ToTable("_AuthUsers");
            builder.Entity<IdentityRole>().ToTable("_AuthRoles");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("_AuthRoleClaims");
            builder.Entity<IdentityUserRole<string>>().ToTable("_AuthUserRoles");
            builder.Entity<IdentityUserLogin<string>>().ToTable("_AuthUserLogins");
            builder.Entity<IdentityUserClaim<string>>().ToTable("_AuthUserClaims");
            builder.Entity<IdentityUserToken<string>>().ToTable("_AuthUserTokens");

            //Domain

            builder.Entity<AnswerEntity>().ToTable("Answers");
            builder.Entity<CourseEntity>().ToTable("Courses");
            builder.Entity<ExamEntity>().ToTable("Exams");
            builder.Entity<PaperEntity>().ToTable("Papers");
            builder.Entity<QuestionEntity>().ToTable("Questions");
            builder.Entity<VoteEntity>().ToTable("Votes");

            //Mappings
            builder.Entity<QuestionEntity>().HasMany(x => x.SubQuestions).WithOne(x => x.ParentQuestion).OnDelete(DeleteBehavior.Restrict);

            builder.Entity<VoteEntity>().HasOne(x => x.Comment).WithMany(x => x.Votes).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<VoteEntity>().HasOne(x => x.Answer).WithMany(x => x.Votes).OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ApplicationUser>().HasMany(x => x.CoursesCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.PapersCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.ExamsCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.QuestionsCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.AnswersCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.CommentsCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.VotesCreated).WithOne(x => x.CreatedBy).OnDelete(DeleteBehavior.Restrict);

            builder.Entity<ApplicationUser>().HasMany(x => x.CoursesUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.PapersUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.ExamsUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.QuestionsUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.AnswersUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.CommentsUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
            builder.Entity<ApplicationUser>().HasMany(x => x.VotesUpdated).WithOne(x => x.UpdatedBy).OnDelete(DeleteBehavior.Restrict);
        }
    }
}
