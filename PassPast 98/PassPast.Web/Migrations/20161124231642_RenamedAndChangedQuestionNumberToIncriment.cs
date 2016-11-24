using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PassPast.Web.Migrations
{
    public partial class RenamedAndChangedQuestionNumberToIncriment : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Number",
                table: "Questions");

            migrationBuilder.AddColumn<string>(
                name: "Incriment",
                table: "Questions",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Incriment",
                table: "Questions");

            migrationBuilder.AddColumn<int>(
                name: "Number",
                table: "Questions",
                nullable: false,
                defaultValue: 0);
        }
    }
}
