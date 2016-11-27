using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Metadata;

namespace PassPast.Web.Migrations
{
    public partial class ChaningTheIncrimentationSchemeToBeEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Questions_IncrimentationScheme_IncrimentationSchemeId",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_McqAnswers_IncrimentationScheme_IncrimentationSchemeId",
                table: "McqAnswers");

            migrationBuilder.DropTable(
                name: "IncrimentationScheme");

            migrationBuilder.DropIndex(
                name: "IX_McqAnswers_IncrimentationSchemeId",
                table: "McqAnswers");

            migrationBuilder.DropIndex(
                name: "IX_Questions_IncrimentationSchemeId",
                table: "Questions");

            migrationBuilder.DropColumn(
                name: "IncrimentationSchemeId",
                table: "McqAnswers");

            migrationBuilder.DropColumn(
                name: "IncrimentationSchemeId",
                table: "Questions");

            migrationBuilder.AddColumn<int>(
                name: "IncrimentationScheme",
                table: "McqAnswers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IncrimentationScheme",
                table: "Questions",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IncrimentationScheme",
                table: "McqAnswers");

            migrationBuilder.DropColumn(
                name: "IncrimentationScheme",
                table: "Questions");

            migrationBuilder.AddColumn<int>(
                name: "IncrimentationSchemeId",
                table: "McqAnswers",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IncrimentationSchemeId",
                table: "Questions",
                nullable: false,
                defaultValue: 0);

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

            migrationBuilder.CreateIndex(
                name: "IX_McqAnswers_IncrimentationSchemeId",
                table: "McqAnswers",
                column: "IncrimentationSchemeId");

            migrationBuilder.CreateIndex(
                name: "IX_Questions_IncrimentationSchemeId",
                table: "Questions",
                column: "IncrimentationSchemeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Questions_IncrimentationScheme_IncrimentationSchemeId",
                table: "Questions",
                column: "IncrimentationSchemeId",
                principalTable: "IncrimentationScheme",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_McqAnswers_IncrimentationScheme_IncrimentationSchemeId",
                table: "McqAnswers",
                column: "IncrimentationSchemeId",
                principalTable: "IncrimentationScheme",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
