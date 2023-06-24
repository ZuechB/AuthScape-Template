using AuthScape.Models.Document;

namespace Models.DocumentProcessing
{
    public class Document_Field
    {
        public long Id { get; set; }
        public Guid DocumentId { get; set; }

        public long DocumentFieldCategoryId { get; set; }

        public string FieldName { get; set; }
        public float? Confidence { get; set; }
        public DocumentType DocumentType { get; set; }
        public string Value { get; set; }

        public Document Document { get; set; }
        public DocumentFieldCategory Category { get; set; }
    }
}