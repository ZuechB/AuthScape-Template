using AuthScape.Models.Users;

namespace Models.OEM
{
    public class DnsDesignField
    {
        public long DnsRecordId { get; set; }
        public long CompanyId { get; set; }
        public string? PrettyCSS { get; set; }
        public string? MinifiedCSS { get; set; }
        public string? PrettyHTML { get; set; }
        public string? MinifiedHTML { get; set; }
        public string? HeaderCode { get; set; }

        public string? PrimaryButtonColor { get; set; }
        public string? SecondaryButtonColor { get; set; }
        public string? PrimaryTextColor { get; set; }
        public string? SecondaryTextColor { get; set; }

        public string? FontFamily { get; set; }

        public string? FavIcon { get; set; }


        public DnsRecord DnsRecord { get; set; }
        public Company Company { get; set; }
    }
}
