using AuthScape.Models.Users;

namespace Models.DocumentProcessing
{
    public class DocumentFolder
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public long? CompanyId { get; set; }
        public long? UploadedByUserId { get; set; }

        public Guid? ParentId { get; set; }

        public DocumentFolder? ParentFolder { get; set; }
        public Company? Company { get; set; }
        public AppUser? UploadedByUser { get; set; }
        public DateTimeOffset LastUpdated { get; set; }
        public DateTimeOffset Created { get; set; }
    }
}