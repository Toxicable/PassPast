using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PassPast.Web.Migrations
{
    public partial class morevalidation : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers__AuthUsers_CreatedById",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments__AuthUsers_CreatedById",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes__AuthUsers_CreatedById",
                table: "Votes");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams__AuthUsers_CreatedById",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Papers__AuthUsers_CreatedById",
                table: "Papers");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions__AuthUsers_CreatedById",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_McqAnswers__AuthUsers_CreatedById",
                table: "McqAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_ShortAnswers__AuthUsers_CreatedById",
                table: "ShortAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "ShortAnswers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "McqAnswers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Questions",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Papers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Exams",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Votes",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Courses",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Comments",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Answers",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Answers__AuthUsers_CreatedById",
                table: "Answers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments__AuthUsers_CreatedById",
                table: "Comments",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Votes__AuthUsers_CreatedById",
                table: "Votes",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams__AuthUsers_CreatedById",
                table: "Exams",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Papers__AuthUsers_CreatedById",
                table: "Papers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions__AuthUsers_CreatedById",
                table: "Questions",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_McqAnswers__AuthUsers_CreatedById",
                table: "McqAnswers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ShortAnswers__AuthUsers_CreatedById",
                table: "ShortAnswers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Answers__AuthUsers_CreatedById",
                table: "Answers");

            migrationBuilder.DropForeignKey(
                name: "FK_Comments__AuthUsers_CreatedById",
                table: "Comments");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes__AuthUsers_CreatedById",
                table: "Votes");

            migrationBuilder.DropForeignKey(
                name: "FK_Exams__AuthUsers_CreatedById",
                table: "Exams");

            migrationBuilder.DropForeignKey(
                name: "FK_Papers__AuthUsers_CreatedById",
                table: "Papers");

            migrationBuilder.DropForeignKey(
                name: "FK_Questions__AuthUsers_CreatedById",
                table: "Questions");

            migrationBuilder.DropForeignKey(
                name: "FK_McqAnswers__AuthUsers_CreatedById",
                table: "McqAnswers");

            migrationBuilder.DropForeignKey(
                name: "FK_ShortAnswers__AuthUsers_CreatedById",
                table: "ShortAnswers");

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "ShortAnswers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "McqAnswers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Questions",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Papers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Exams",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Votes",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Courses",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Comments",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "CreatedById",
                table: "Answers",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AddForeignKey(
                name: "FK_Answers__AuthUsers_CreatedById",
                table: "Answers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Comments__AuthUsers_CreatedById",
                table: "Comments",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Votes__AuthUsers_CreatedById",
                table: "Votes",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exams__AuthUsers_CreatedById",
                table: "Exams",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Papers__AuthUsers_CreatedById",
                table: "Papers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Questions__AuthUsers_CreatedById",
                table: "Questions",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_McqAnswers__AuthUsers_CreatedById",
                table: "McqAnswers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_ShortAnswers__AuthUsers_CreatedById",
                table: "ShortAnswers",
                column: "CreatedById",
                principalTable: "_AuthUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
