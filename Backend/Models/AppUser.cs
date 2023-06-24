using System.ComponentModel;
using Microsoft.AspNetCore.Identity;
using AuthScape.Models.PaymentGateway;
using Models.TicketSystem;
using Models.DocumentProcessing;

namespace AuthScape.Models.Users
{
    public class AppUser : IdentityUser<long>
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string? locale { get; set; }
        public DateTimeOffset Created { get; set; }
        public DateTimeOffset LastLoggedIn { get; set; }
        public bool IsActive { get; set; }
        public string? PhotoUri { get; set; }
        public long? CompanyId { get; set; }
        public long? LocationId { get; set; }
        public Roles Roles { get; set; }
        public string? PaymentGatewayCustomerId { get; set; }
        public DateTimeOffset? WhenInviteSent { get; set; }
        public Location? Location { get; set; }
        public Company? Company { get; set; }
        public ICollection<Wallet> Cards { get; set; }
        public ICollection<StoreCredit> StoreCredits { get; set; }
        public ICollection<StoreCredit> GiftedCredit { get; set; } // credits that you gifted to another user
        public ICollection<TicketParticipant> TicketParticipants { get; set; }
        public ICollection<TicketMessage> TicketMessages { get; set; }
        public ICollection<Ticket> Tickets { get; set; }
        public ICollection<DocumentFolder> DocumentFolders { get; set; }
    }

    public enum Roles
    {
        [Description("Customer")]
        Customer = 0,

        [Description("Admin")]
        Admin = 4
    }
}