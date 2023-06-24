using AuthScape.Models.Users;

namespace Models.TicketSystem
{
    public class TicketParticipant
    {
        public long UserId { get; set; }
        public long TicketId { get; set; }

        public Ticket Ticket { get; set; }
        public AppUser AppUser { get; set; }
    }
}