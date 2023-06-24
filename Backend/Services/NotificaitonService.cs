using Models.TicketSystem;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services
{
    public interface INotificaitonService
    {
        Task NotifyTicketCreated(Ticket ticket);
        Task NotifyTicketMessageCreated(TicketMessage ticketMessage);
    }

    public class NotificaitonService : INotificaitonService
    {
        public async Task NotifyTicketCreated(Ticket ticket)
        {
            // Notify your team that a ticket was created via email or teams
        }

        public async Task NotifyTicketMessageCreated(TicketMessage ticketMessage)
        {
            // Notify your team that a ticket message was created via email or teams
        }
    }
}
