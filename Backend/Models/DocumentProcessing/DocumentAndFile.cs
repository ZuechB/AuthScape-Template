namespace Models.DocumentProcessing
{
    public class DocumentAndFile
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public DocumentFileExtentionType DocumentFileExtentionType { get; set; }
        public string Uri { get; set; }
        public int Count { get; set; }
        public string LastUpdated { get; set; }
    }

    public enum DocumentFileExtentionType
    {
        None = 0,
        Photo = 1
    }
}