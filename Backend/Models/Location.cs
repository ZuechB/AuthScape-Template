
namespace AuthScape.Models.Users
{
    public class Location
    {
        public long Id { get; set; }
        public string Title { get; set; }

        public long CompanyId { get; set; }
        public Company Company { get; set; }
        public string? PaymentGatewayCustomerId { get; set; }
        public ICollection<AppUser> Users { get; set; }
    }
}