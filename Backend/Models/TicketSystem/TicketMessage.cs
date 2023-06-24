using AuthScape.Models.Users;

namespace Models.TicketSystem
{
    public class TicketMessage
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset Created { get; set; }
        public long TicketId { get; set; }
        public string Message { get; set; }
        public long? CreatedByUserId { get; set; }
        public bool IsNote { get; set; }

        public AppUser? CreatedByUser { get; set; }
        public Ticket Ticket { get; set; }
    }
}
