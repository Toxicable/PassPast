using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore.Migrations;

namespace PassPast.Web.Migrations
{
    public partial class InitalMigration2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__AuthTokens__Auth0Applications_ApplicationId",
                table: "_AuthTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK__Auth0Applications",
                table: "_Auth0Applications");

            migrationBuilder.RenameTable(
                name: "_Auth0Applications",
                newName: "_AuthApplications");

            migrationBuilder.RenameIndex(
                name: "IX__Auth0Applications_ClientId",
                table: "_AuthApplications",
                newName: "IX__AuthApplications_ClientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__AuthApplications",
                table: "_AuthApplications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK__AuthTokens__AuthApplications_ApplicationId",
                table: "_AuthTokens",
                column: "ApplicationId",
                principalTable: "_AuthApplications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK__AuthTokens__AuthApplications_ApplicationId",
                table: "_AuthTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK__AuthApplications",
                table: "_AuthApplications");

            migrationBuilder.RenameTable(
                name: "_AuthApplications",
                newName: "_Auth0Applications");

            migrationBuilder.RenameIndex(
                name: "IX__AuthApplications_ClientId",
                table: "_Auth0Applications",
                newName: "IX__Auth0Applications_ClientId");

            migrationBuilder.AddPrimaryKey(
                name: "PK__Auth0Applications",
                table: "_Auth0Applications",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK__AuthTokens__Auth0Applications_ApplicationId",
                table: "_AuthTokens",
                column: "ApplicationId",
                principalTable: "_Auth0Applications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
