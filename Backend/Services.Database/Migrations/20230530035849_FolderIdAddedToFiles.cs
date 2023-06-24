using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class FolderIdAddedToFiles : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<Guid>(
                name: "DocumentFolderId",
                table: "Documents",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Documents_DocumentFolderId",
                table: "Documents",
                column: "DocumentFolderId");

            migrationBuilder.AddForeignKey(
                name: "FK_Documents_DocumentFolders_DocumentFolderId",
                table: "Documents",
                column: "DocumentFolderId",
                principalTable: "DocumentFolders",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Documents_DocumentFolders_DocumentFolderId",
                table: "Documents");

            migrationBuilder.DropIndex(
                name: "IX_Documents_DocumentFolderId",
                table: "Documents");

            migrationBuilder.DropColumn(
                name: "DocumentFolderId",
                table: "Documents");
        }
    }
}
