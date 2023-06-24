using AuthScape.Models.PaymentGateway;
using Models.DocumentProcessing;
using Models.OEM;

namespace AuthScape.Models.Users
{
    public class Company
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string? Description { get; set; }
        public string? PaymentGatewayCustomerId { get; set; }

        public ICollection<AppUser> Users { get; set; }
        public ICollection<StoreCredit> StoreCredits { get; set; }
        public ICollection<Location> Locations { get; set; }
        public ICollection<DnsDesignField> DnsDesignFields { get; set; }
        public ICollection<DnsRecord> DnsRecords { get; set; }
        public ICollection<DocumentFolder> DocumentFolders { get; set; }
    }

    public class NCACompanyQuery
    {
        public string label { get; set; }
        public long id { get; set; }
    }
}