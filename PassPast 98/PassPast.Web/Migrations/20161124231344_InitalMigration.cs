﻿using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PassPast.Web.Migrations
{
    public partial class InitalMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "_AuthRoles",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    Name = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_AuthUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    LoginProvider = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    Value = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                });

            migrationBuilder.CreateTable(
                name: "_AuthApplications",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ClientId = table.Column<string>(nullable: true),
                    ClientSecret = table.Column<string>(nullable: true),
                    DisplayName = table.Column<string>(nullable: true),
                    LogoutRedirectUri = table.Column<string>(nullable: true),
                    RedirectUri = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthApplications", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_AuthAuthorizations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Scope = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthAuthorizations", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_AuthScopes",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Description = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthScopes", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_AuthUsers",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AccessFailedCount = table.Column<int>(nullable: false),
                    ConcurrencyStamp = table.Column<string>(nullable: true),
                    CreateAt = table.Column<DateTimeOffset>(nullable: false),
                    Email = table.Column<string>(maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(nullable: false),
                    FirstName = table.Column<string>(nullable: true),
                    LastName = table.Column<string>(nullable: true),
                    LockoutEnabled = table.Column<bool>(nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(nullable: true),
                    NormalizedEmail = table.Column<string>(maxLength: 256, nullable: true),
                    NormalizedUserName = table.Column<string>(maxLength: 256, nullable: true),
                    PasswordHash = table.Column<string>(nullable: true),
                    PhoneNumber = table.Column<string>(nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(nullable: false),
                    SecurityStamp = table.Column<string>(nullable: true),
                    TwoFactorEnabled = table.Column<bool>(nullable: false),
                    UserName = table.Column<string>(maxLength: 256, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IncrimentationScheme",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IncrimentationScheme", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "_AuthRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK__AuthRoleClaims__AuthRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "_AuthRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "_AuthTokens",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ApplicationId = table.Column<string>(nullable: true),
                    AuthorizationId = table.Column<string>(nullable: true),
                    Type = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK__AuthTokens__AuthApplications_ApplicationId",
                        column: x => x.ApplicationId,
                        principalTable: "_AuthApplications",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__AuthTokens__AuthAuthorizations_AuthorizationId",
                        column: x => x.AuthorizationId,
                        principalTable: "_AuthAuthorizations",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "_AuthUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    ClaimType = table.Column<string>(nullable: true),
                    ClaimValue = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK__AuthUserClaims__AuthUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "_AuthUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(nullable: false),
                    ProviderKey = table.Column<string>(nullable: false),
                    ProviderDisplayName = table.Column<string>(nullable: true),
                    UserId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK__AuthUserLogins__AuthUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "_AuthUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(nullable: false),
                    RoleId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK__AuthUserRoles__AuthRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "_AuthRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__AuthUserRoles__AuthUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Courses",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Code = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Courses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Courses__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Courses__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "QuestionTypes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_QuestionTypes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_QuestionTypes__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_QuestionTypes__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "_AuthExternalAccounts",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AddedAt = table.Column<DateTimeOffset>(nullable: false),
                    Provider = table.Column<int>(nullable: false),
                    ProviderUserId = table.Column<string>(nullable: false),
                    UserId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__AuthExternalAccounts", x => x.Id);
                    table.ForeignKey(
                        name: "FK__AuthExternalAccounts__AuthUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Papers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CourseId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Name = table.Column<string>(nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Papers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Papers_Courses_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Courses",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Papers__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Papers__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Exams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    PaperId = table.Column<int>(nullable: false),
                    Semester = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true),
                    Year = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Exams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Exams__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Exams_Papers_PaperId",
                        column: x => x.PaperId,
                        principalTable: "Papers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Exams__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Questions",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    ExamId = table.Column<int>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    IncrimentationSchemeId = table.Column<int>(nullable: false),
                    Number = table.Column<int>(nullable: false),
                    ParentQuestionId = table.Column<int>(nullable: false),
                    TypeId = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Questions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Questions__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Questions_Exams_ExamId",
                        column: x => x.ExamId,
                        principalTable: "Exams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Questions_IncrimentationScheme_IncrimentationSchemeId",
                        column: x => x.IncrimentationSchemeId,
                        principalTable: "IncrimentationScheme",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Questions_Questions_ParentQuestionId",
                        column: x => x.ParentQuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Questions_QuestionTypes_TypeId",
                        column: x => x.TypeId,
                        principalTable: "QuestionTypes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Questions__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Answers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    McqAnswerId = table.Column<int>(nullable: false),
                    QuestionId = table.Column<int>(nullable: false),
                    ShortAnswerId = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Answers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Answers__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Answers_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Answers__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Content = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    CreatedById = table.Column<string>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    QuestionId = table.Column<int>(nullable: false),
                    UpdatedAt = table.Column<DateTimeOffset>(nullable: true),
                    UpdatedById = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments__AuthUsers_CreatedById",
                        column: x => x.CreatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Questions_QuestionId",
                        column: x => x.QuestionId,
                        principalTable: "Questions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Comments__AuthUsers_UpdatedById",
                        column: x => x.UpdatedById,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "McqAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AnswerId = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    ApplicationUserId1 = table.Column<string>(nullable: true),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Incriment = table.Column<string>(nullable: false),
                    IncrimentationSchemeId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_McqAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_McqAnswers_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_McqAnswers__AuthUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_McqAnswers__AuthUsers_ApplicationUserId1",
                        column: x => x.ApplicationUserId1,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_McqAnswers_IncrimentationScheme_IncrimentationSchemeId",
                        column: x => x.IncrimentationSchemeId,
                        principalTable: "IncrimentationScheme",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "ShortAnswers",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AnswerId = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    ApplicationUserId1 = table.Column<string>(nullable: true),
                    Content = table.Column<string>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShortAnswers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ShortAnswers_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShortAnswers__AuthUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_ShortAnswers__AuthUsers_ApplicationUserId1",
                        column: x => x.ApplicationUserId1,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Votes",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    AnswerId = table.Column<int>(nullable: false),
                    ApplicationUserId = table.Column<string>(nullable: true),
                    ApplicationUserId1 = table.Column<string>(nullable: true),
                    CommentId = table.Column<int>(nullable: false),
                    CreatedAt = table.Column<DateTimeOffset>(nullable: false),
                    Deleted = table.Column<bool>(nullable: false),
                    Hidden = table.Column<bool>(nullable: false),
                    Type = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Votes", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Votes_Answers_AnswerId",
                        column: x => x.AnswerId,
                        principalTable: "Answers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Votes__AuthUsers_ApplicationUserId",
                        column: x => x.ApplicationUserId,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Votes__AuthUsers_ApplicationUserId1",
                        column: x => x.ApplicationUserId1,
                        principalTable: "_AuthUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Votes_Comments_CommentId",
                        column: x => x.CommentId,
                        principalTable: "Comments",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "_AuthRoles",
                column: "NormalizedName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX__AuthRoleClaims_RoleId",
                table: "_AuthRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX__AuthUserClaims_UserId",
                table: "_AuthUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX__AuthUserLogins_UserId",
                table: "_AuthUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX__AuthUserRoles_RoleId",
                table: "_AuthUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX__AuthApplications_ClientId",
                table: "_AuthApplications",
                column: "ClientId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX__AuthTokens_ApplicationId",
                table: "_AuthTokens",
                column: "ApplicationId");

            migrationBuilder.CreateIndex(
                name: "IX__AuthTokens_AuthorizationId",
                table: "_AuthTokens",
                column: "AuthorizationId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_CreatedById",
                table: "Answers",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_QuestionId",
                table: "Answers",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Answers_UpdatedById",
                table: "Answers",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_CreatedById",
                table: "Comments",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_QuestionId",
                table: "Comments",
                column: "QuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_UpdatedById",
                table: "Comments",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_CreatedById",
                table: "Courses",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Courses_UpdatedById",
                table: "Courses",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_AnswerId",
                table: "Votes",
                column: "AnswerId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ApplicationUserId",
                table: "Votes",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_ApplicationUserId1",
                table: "Votes",
                column: "ApplicationUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_Votes_CommentId",
                table: "Votes",
                column: "CommentId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_CreatedById",
                table: "Exams",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_PaperId",
                table: "Exams",
                column: "PaperId");

            migrationBuilder.CreateIndex(
                name: "IX_Exams_UpdatedById",
                table: "Exams",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_CourseId",
                table: "Papers",
                column: "CourseId");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_CreatedById",
                table: "Papers",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Papers_UpdatedById",
                table: "Papers",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_CreatedById",
                table: "Questions",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ExamId",
                table: "Questions",
                column: "ExamId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_IncrimentationSchemeId",
                table: "Questions",
                column: "IncrimentationSchemeId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_ParentQuestionId",
                table: "Questions",
                column: "ParentQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_TypeId",
                table: "Questions",
                column: "TypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_UpdatedById",
                table: "Questions",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "_AuthUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "_AuthUsers",
                column: "NormalizedUserName",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_McqAnswers_AnswerId",
                table: "McqAnswers",
                column: "AnswerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_McqAnswers_ApplicationUserId",
                table: "McqAnswers",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_McqAnswers_ApplicationUserId1",
                table: "McqAnswers",
                column: "ApplicationUserId1");

            migrationBuilder.CreateIndex(
                name: "IX_McqAnswers_IncrimentationSchemeId",
                table: "McqAnswers",
                column: "IncrimentationSchemeId");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTypes_CreatedById",
                table: "QuestionTypes",
                column: "CreatedById");

            migrationBuilder.CreateIndex(
                name: "IX_QuestionTypes_UpdatedById",
                table: "QuestionTypes",
                column: "UpdatedById");

            migrationBuilder.CreateIndex(
                name: "IX_ShortAnswers_AnswerId",
                table: "ShortAnswers",
                column: "AnswerId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ShortAnswers_ApplicationUserId",
                table: "ShortAnswers",
                column: "ApplicationUserId");

            migrationBuilder.CreateIndex(
                name: "IX_ShortAnswers_ApplicationUserId1",
                table: "ShortAnswers",
                column: "ApplicationUserId1");

            migrationBuilder.CreateIndex(
                name: "IX__AuthExternalAccounts_UserId",
                table: "_AuthExternalAccounts",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_AuthRoleClaims");

            migrationBuilder.DropTable(
                name: "_AuthUserClaims");

            migrationBuilder.DropTable(
                name: "_AuthUserLogins");

            migrationBuilder.DropTable(
                name: "_AuthUserRoles");

            migrationBuilder.DropTable(
                name: "_AuthUserTokens");

            migrationBuilder.DropTable(
                name: "_AuthScopes");

            migrationBuilder.DropTable(
                name: "_AuthTokens");

            migrationBuilder.DropTable(
                name: "Votes");

            migrationBuilder.DropTable(
                name: "McqAnswers");

            migrationBuilder.DropTable(
                name: "ShortAnswers");

            migrationBuilder.DropTable(
                name: "_AuthExternalAccounts");

            migrationBuilder.DropTable(
                name: "_AuthRoles");

            migrationBuilder.DropTable(
                name: "_AuthApplications");

            migrationBuilder.DropTable(
                name: "_AuthAuthorizations");

            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropTable(
                name: "Answers");

            migrationBuilder.DropTable(
                name: "Questions");

            migrationBuilder.DropTable(
                name: "Exams");

            migrationBuilder.DropTable(
                name: "IncrimentationScheme");

            migrationBuilder.DropTable(
                name: "QuestionTypes");

            migrationBuilder.DropTable(
                name: "Papers");

            migrationBuilder.DropTable(
                name: "Courses");

            migrationBuilder.DropTable(
                name: "_AuthUsers");
        }
    }
}