﻿namespace Models.TicketSystem
{
    public class TicketType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<Ticket> Tickets { get; set; }
    }
}