using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PassPast.Web.Migrations
{
    public partial class ChangedToNullableIntForParentQUestionId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IncrimentationScheme",
                table: "Questions");

            migrationBuilder.AlterColumn<int>(
                name: "ParentQuestionId",
                table: "Questions",
                nullable: true,
                oldClrType: typeof(int));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<int>(
                name: "ParentQuestionId",
                table: "Questions",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IncrimentationScheme",
                table: "Questions",
                nullable: false,
                defaultValue: 0);
        }
    }
}
