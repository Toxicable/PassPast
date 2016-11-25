﻿using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using PassPast.Web;
using PassPast.Data.Domain;
using PassPast.Data;

namespace PassPast.Web.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    [Migration("20161124231642_RenamedAndChangedQuestionNumberToIncriment")]
    partial class RenamedAndChangedQuestionNumberToIncriment
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.0-rtm-22752")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex");

                    b.ToTable("_AuthRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("RoleId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("_AuthRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClaimType");

                    b.Property<string>("ClaimValue");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("_AuthUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider");

                    b.Property<string>("ProviderKey");

                    b.Property<string>("ProviderDisplayName");

                    b.Property<string>("UserId")
                        .IsRequired();

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("_AuthUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("_AuthUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("_AuthUserTokens");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictApplication", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ClientId");

                    b.Property<string>("ClientSecret");

                    b.Property<string>("DisplayName");

                    b.Property<string>("LogoutRedirectUri");

                    b.Property<string>("RedirectUri");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .IsUnique();

                    b.ToTable("_AuthApplications");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictAuthorization", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Scope");

                    b.HasKey("Id");

                    b.ToTable("_AuthAuthorizations");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictScope", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("_AuthScopes");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictToken", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("ApplicationId");

                    b.Property<string>("AuthorizationId");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("AuthorizationId");

                    b.ToTable("_AuthTokens");
                });

            modelBuilder.Entity("PassPast.Data.AnswerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<int>("McqAnswerId");

                    b.Property<int>("QuestionId");

                    b.Property<int>("ShortAnswerId");

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("QuestionId");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("PassPast.Data.CommentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content")
                        .IsRequired();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<int>("QuestionId");

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("QuestionId");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("PassPast.Data.CourseEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code")
                        .IsRequired();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("PassPast.Data.Domain.VoteEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnswerId");

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("ApplicationUserId1");

                    b.Property<int>("CommentId");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId");

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ApplicationUserId1");

                    b.HasIndex("CommentId");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("PassPast.Data.ExamEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<int>("PaperId");

                    b.Property<int>("Semester");

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("PaperId");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Exams");
                });

            modelBuilder.Entity("PassPast.Data.PaperEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CourseId");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<string>("Name")
                        .IsRequired();

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.HasIndex("CreatedById");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Papers");
                });

            modelBuilder.Entity("PassPast.Data.QuestionEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<int>("ExamId");

                    b.Property<bool>("Hidden");

                    b.Property<string>("Incriment")
                        .IsRequired();

                    b.Property<int>("IncrimentationSchemeId");

                    b.Property<int>("ParentQuestionId");

                    b.Property<int>("TypeId");

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("ExamId");

                    b.HasIndex("IncrimentationSchemeId");

                    b.HasIndex("ParentQuestionId");

                    b.HasIndex("TypeId");

                    b.HasIndex("UpdatedById");

                    b.ToTable("Questions");
                });

            modelBuilder.Entity("PassPast.Web.ApplicationUser", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTimeOffset>("CreateAt");

                    b.Property<string>("Email")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("_AuthUsers");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.IncrimentationSchemeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("IncrimentationScheme");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.McqAnswerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnswerId");

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("ApplicationUserId1");

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<string>("Incriment")
                        .IsRequired();

                    b.Property<int>("IncrimentationSchemeId");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId")
                        .IsUnique();

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ApplicationUserId1");

                    b.HasIndex("IncrimentationSchemeId");

                    b.ToTable("McqAnswers");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.QuestionTypeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<string>("CreatedById")
                        .IsRequired();

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.Property<string>("Name");

                    b.Property<DateTimeOffset?>("UpdatedAt");

                    b.Property<string>("UpdatedById");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("UpdatedById");

                    b.ToTable("QuestionTypes");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.ShortAnswerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("AnswerId");

                    b.Property<string>("ApplicationUserId");

                    b.Property<string>("ApplicationUserId1");

                    b.Property<string>("Content")
                        .IsRequired();

                    b.Property<DateTimeOffset>("CreatedAt");

                    b.Property<bool>("Deleted");

                    b.Property<bool>("Hidden");

                    b.HasKey("Id");

                    b.HasIndex("AnswerId")
                        .IsUnique();

                    b.HasIndex("ApplicationUserId");

                    b.HasIndex("ApplicationUserId1");

                    b.ToTable("ShortAnswers");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Entities.ExternalAccount", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<DateTimeOffset>("AddedAt");

                    b.Property<int>("Provider");

                    b.Property<string>("ProviderUserId")
                        .IsRequired();

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("_AuthExternalAccounts");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Claims")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("Claims")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("Logins")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole")
                        .WithMany("Users")
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("Roles")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("OpenIddict.OpenIddictToken", b =>
                {
                    b.HasOne("OpenIddict.OpenIddictApplication")
                        .WithMany("Tokens")
                        .HasForeignKey("ApplicationId");

                    b.HasOne("OpenIddict.OpenIddictAuthorization")
                        .WithMany("Tokens")
                        .HasForeignKey("AuthorizationId");
                });

            modelBuilder.Entity("PassPast.Data.AnswerEntity", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany("AnswersCreated")
                        .HasForeignKey("CreatedById");

                    b.HasOne("PassPast.Data.QuestionEntity", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany("AnswersUpdated")
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Data.CommentEntity", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany("CommentsCreated")
                        .HasForeignKey("CreatedById");

                    b.HasOne("PassPast.Data.QuestionEntity", "Question")
                        .WithMany("Comments")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany("CommentsUpdated")
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Data.CourseEntity", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany("CoursesCreated")
                        .HasForeignKey("CreatedById");

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany("CoursesUpdated")
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Data.Domain.VoteEntity", b =>
                {
                    b.HasOne("PassPast.Data.AnswerEntity", "Answer")
                        .WithMany("Votes")
                        .HasForeignKey("AnswerId");

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("VotesCreated")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("VotesUpdated")
                        .HasForeignKey("ApplicationUserId1");

                    b.HasOne("PassPast.Data.CommentEntity", "Comment")
                        .WithMany("Votes")
                        .HasForeignKey("CommentId");
                });

            modelBuilder.Entity("PassPast.Data.ExamEntity", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany("ExamsCreated")
                        .HasForeignKey("CreatedById");

                    b.HasOne("PassPast.Data.PaperEntity", "Paper")
                        .WithMany("Exams")
                        .HasForeignKey("PaperId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany("ExamsUpdated")
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Data.PaperEntity", b =>
                {
                    b.HasOne("PassPast.Data.CourseEntity", "Course")
                        .WithMany("Papers")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany("PapersCreated")
                        .HasForeignKey("CreatedById");

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany("PapersUpdated")
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Data.QuestionEntity", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany("QuestionsCreated")
                        .HasForeignKey("CreatedById");

                    b.HasOne("PassPast.Data.ExamEntity", "Exam")
                        .WithMany("Questions")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.Infrastructure.Domain.IncrimentationSchemeEntity", "IncrimentationScheme")
                        .WithMany("Questions")
                        .HasForeignKey("IncrimentationSchemeId");

                    b.HasOne("PassPast.Data.QuestionEntity", "ParentQuestion")
                        .WithMany("SubQuestions")
                        .HasForeignKey("ParentQuestionId");

                    b.HasOne("PassPast.Web.Infrastructure.Domain.QuestionTypeEntity", "Type")
                        .WithMany("Questions")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany("QuestionsUpdated")
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.McqAnswerEntity", b =>
                {
                    b.HasOne("PassPast.Data.AnswerEntity", "Answer")
                        .WithOne("McqAnswer")
                        .HasForeignKey("PassPast.Web.Infrastructure.Domain.McqAnswerEntity", "AnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("McqAnswersCreated")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("McqAnswersUpdated")
                        .HasForeignKey("ApplicationUserId1");

                    b.HasOne("PassPast.Web.Infrastructure.Domain.IncrimentationSchemeEntity", "IncrimentationScheme")
                        .WithMany("McqAnswers")
                        .HasForeignKey("IncrimentationSchemeId");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.QuestionTypeEntity", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "CreatedBy")
                        .WithMany()
                        .HasForeignKey("CreatedById")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser", "UpdatedBy")
                        .WithMany()
                        .HasForeignKey("UpdatedById");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Domain.ShortAnswerEntity", b =>
                {
                    b.HasOne("PassPast.Data.AnswerEntity", "Answer")
                        .WithOne("ShortAnswer")
                        .HasForeignKey("PassPast.Web.Infrastructure.Domain.ShortAnswerEntity", "AnswerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("ShortAnswersCreated")
                        .HasForeignKey("ApplicationUserId");

                    b.HasOne("PassPast.Web.ApplicationUser")
                        .WithMany("ShortAnswersUpdated")
                        .HasForeignKey("ApplicationUserId1");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Entities.ExternalAccount", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "User")
                        .WithMany("ExternalAccounts")
                        .HasForeignKey("UserId");
                });
        }
    }
}