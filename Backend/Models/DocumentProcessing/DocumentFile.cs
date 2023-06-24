using AuthScape.Models.Storage;

namespace Models.DocumentProcessing
{
    public class DocumentFile : FileStorage
    {
        //public long DocumentFieldCategoryId { get; set; }
        public Guid? ParentFolderId { get; set; }
    }
}
