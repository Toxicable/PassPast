using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using PassPast.Web;

namespace PassPast.Web.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.0.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityRole", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<string>("Name")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .HasName("RoleNameIndex");

                    b.ToTable("AspNetRoles");
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

                    b.ToTable("AspNetRoleClaims");
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

                    b.ToTable("AspNetUserClaims");
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

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("RoleId");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.EntityFrameworkCore.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId");

                    b.Property<string>("LoginProvider");

                    b.Property<string>("Name");

                    b.Property<string>("Value");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("PassPast.Web.ApplicationUser", b =>
                {
                    b.Property<string>("Id");

                    b.Property<int>("AccessFailedCount");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken();

                    b.Property<DateTimeOffset>("CreateAt");

                    b.Property<string>("Email")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<bool>("EmailConfirmed");

                    b.Property<string>("FirstName");

                    b.Property<string>("LastName");

                    b.Property<bool>("LockoutEnabled");

                    b.Property<DateTimeOffset?>("LockoutEnd");

                    b.Property<string>("NormalizedEmail")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("NormalizedUserName")
                        .HasAnnotation("MaxLength", 256);

                    b.Property<string>("PasswordHash");

                    b.Property<string>("PhoneNumber");

                    b.Property<bool>("PhoneNumberConfirmed");

                    b.Property<string>("SecurityStamp");

                    b.Property<bool>("TwoFactorEnabled");

                    b.Property<string>("UserName")
                        .HasAnnotation("MaxLength", 256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("PassPast.Web.Infrastructure.Entities.ExternalAccount", b =>
                {
                    b.Property<string>("Id");

                    b.Property<DateTimeOffset>("AddedAt");

                    b.Property<int>("Provider");

                    b.Property<string>("ProviderUserId")
                        .IsRequired();

                    b.Property<string>("UserId");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("ExternalAccounts");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictApplication", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ClientId");

                    b.Property<string>("ClientSecret");

                    b.Property<string>("DisplayName");

                    b.Property<string>("LogoutRedirectUri");

                    b.Property<string>("RedirectUri");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ClientId")
                        .IsUnique();

                    b.ToTable("OpenIddictApplications");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictAuthorization", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("Scope");

                    b.HasKey("Id");

                    b.ToTable("OpenIddictAuthorizations");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictScope", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("Description");

                    b.HasKey("Id");

                    b.ToTable("OpenIddictScopes");
                });

            modelBuilder.Entity("OpenIddict.OpenIddictToken", b =>
                {
                    b.Property<string>("Id");

                    b.Property<string>("ApplicationId");

                    b.Property<string>("AuthorizationId");

                    b.Property<string>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ApplicationId");

                    b.HasIndex("AuthorizationId");

                    b.ToTable("OpenIddictTokens");
                });

            modelBuilder.Entity("PassPast.Data.AnswerEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("QuestionId");

                    b.Property<int>("TypeId");

                    b.HasKey("Id");

                    b.HasIndex("QuestionId");

                    b.HasIndex("TypeId");

                    b.ToTable("Answers");
                });

            modelBuilder.Entity("PassPast.Data.CommentEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Content");

                    b.Property<string>("CreatedById");

                    b.Property<DateTimeOffset>("PostedAt");

                    b.Property<int>("QuestionId");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("QuestionId");

                    b.ToTable("Comments");
                });

            modelBuilder.Entity("PassPast.Data.CourseEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Code");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("Courses");
                });

            modelBuilder.Entity("PassPast.Data.Domain.AnswerTypeEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.ToTable("AnswerTypes");
                });

            modelBuilder.Entity("PassPast.Data.Domain.VoteEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int?>("AnswerEntityId");

                    b.Property<int?>("CommentEntityId");

                    b.Property<int>("Value");

                    b.Property<DateTimeOffset>("VotedAt");

                    b.Property<string>("VotedById");

                    b.HasKey("Id");

                    b.HasIndex("AnswerEntityId");

                    b.HasIndex("CommentEntityId");

                    b.HasIndex("VotedById");

                    b.ToTable("Votes");
                });

            modelBuilder.Entity("PassPast.Data.ExamEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("CreatedById");

                    b.Property<int>("PaperId");

                    b.Property<int>("Semester");

                    b.Property<int>("Year");

                    b.HasKey("Id");

                    b.HasIndex("CreatedById");

                    b.HasIndex("PaperId");

                    b.ToTable("Exams");
                });

            modelBuilder.Entity("PassPast.Data.PaperEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("CourseId");

                    b.Property<string>("Name");

                    b.HasKey("Id");

                    b.HasIndex("CourseId");

                    b.ToTable("Papers");
                });

            modelBuilder.Entity("PassPast.Data.QuestionEntity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<int>("ExamId");

                    b.Property<int>("Number");

                    b.Property<int>("Type");

                    b.HasKey("Id");

                    b.HasIndex("ExamId");

                    b.ToTable("Questions");
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

            modelBuilder.Entity("PassPast.Web.Infrastructure.Entities.ExternalAccount", b =>
                {
                    b.HasOne("PassPast.Web.ApplicationUser", "User")
                        .WithMany("ExternalAccounts")
                        .HasForeignKey("UserId");
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
                    b.HasOne("PassPast.Data.QuestionEntity", "Question")
                        .WithMany("Answers")
                        .HasForeignKey("QuestionId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.HasOne("PassPast.Data.Domain.AnswerTypeEntity", "Type")
                        .WithMany("Answers")
                        .HasForeignKey("TypeId")
                        .OnDelete(DeleteBehavior.Cascade);
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
                });

            modelBuilder.Entity("PassPast.Data.Domain.VoteEntity", b =>
                {
                    b.HasOne("PassPast.Data.AnswerEntity")
                        .WithMany("Votes")
                        .HasForeignKey("AnswerEntityId");

                    b.HasOne("PassPast.Data.CommentEntity")
                        .WithMany("Votes")
                        .HasForeignKey("CommentEntityId");

                    b.HasOne("PassPast.Web.ApplicationUser", "VotedBy")
                        .WithMany("Votes")
                        .HasForeignKey("VotedById");
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
                });

            modelBuilder.Entity("PassPast.Data.PaperEntity", b =>
                {
                    b.HasOne("PassPast.Data.CourseEntity", "Course")
                        .WithMany("Papers")
                        .HasForeignKey("CourseId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("PassPast.Data.QuestionEntity", b =>
                {
                    b.HasOne("PassPast.Data.ExamEntity", "Exam")
                        .WithMany("Questions")
                        .HasForeignKey("ExamId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
        }
    }
}
