using AuthScape.Models.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.OEM
{
    public class DnsRecord
    {
        public long Id { get; set; }
        public long? CompanyId { get; set; }
        
        public string? Domain { get; set; }


        public DateTime? DomainValidated { get; set; }
        public DateTime? WebAppCreated { get; set; }
        public DateTime? SSLCreated { get; set; }
        public DateTime? SSLConnectedToDomain { get; set; }


        public string? DNSErrorMessage { get; set; }


        public Company Company { get; set; }
        public ICollection<DnsDesignField> DnsDesignFields { get; set; }
    }
}
