using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Services.Database.Migrations
{
    /// <inheritdoc />
    public partial class DocumentFieldCategoryIdAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<long>(
                name: "DocumentFieldCategoryId",
                table: "DocumentFields",
                type: "bigint",
                nullable: false,
                defaultValue: 0L);

            migrationBuilder.CreateIndex(
                name: "IX_DocumentFields_DocumentFieldCategoryId",
                table: "DocumentFields",
                column: "DocumentFieldCategoryId");

            migrationBuilder.AddForeignKey(
                name: "FK_DocumentFields_DocumentFieldCategory_DocumentFieldCategoryId",
                table: "DocumentFields",
                column: "DocumentFieldCategoryId",
                principalTable: "DocumentFieldCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DocumentFields_DocumentFieldCategory_DocumentFieldCategoryId",
                table: "DocumentFields");

            migrationBuilder.DropIndex(
                name: "IX_DocumentFields_DocumentFieldCategoryId",
                table: "DocumentFields");

            migrationBuilder.DropColumn(
                name: "DocumentFieldCategoryId",
                table: "DocumentFields");
        }
    }
}
