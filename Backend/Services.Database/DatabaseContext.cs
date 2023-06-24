using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using AuthScape.Models.Pages;
using AuthScape.Models.Stylesheets;
using AuthScape.Models.Users;
using AuthScape.Models.PaymentGateway;
using AuthScape.Models.PaymentGateway.Coupons;
using AuthScape.Models.PaymentGateway.Plans;
using AuthScape.Plugins.Invoices.Models;
using Models.TicketSystem;
using OpenIddict.EntityFrameworkCore.Models;
using Models.OEM;
using Models.DocumentProcessing;
using AuthScape.Models.Authentication;

namespace Services.Context
{
    public class DatabaseContext : IdentityDbContext<AppUser, Role, long>
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) { }

        public DbSet<Page> Pages { get; set; }
        public DbSet<Stylesheet> Stylesheets { get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<Location> Locations { get; set; }

        #region PaymentGateway

        public DbSet<Plan> Plans { get; set; }
        public DbSet<Wallet> Wallets { get; set; }
        public DbSet<StoreCredit> StoreCredits { get; set; }
        public DbSet<StripeConnectAccount> StripeConnectAccounts { get; set; }

        #endregion

        #region OpenIdDict

        public DbSet<OpenIddictEntityFrameworkCoreApplication> OpenIddictApplications { get; set; }
        public DbSet<OpenIddictEntityFrameworkCoreAuthorization> OpenIddictAuthorizations { get; set; }
        public DbSet<OpenIddictEntityFrameworkCoreScope> OpenIddictScopes { get; set; }
        public DbSet<OpenIddictEntityFrameworkCoreToken> OpenIddictTokens { get; set; }

        #endregion

        #region Coupons

        public DbSet<Coupon> Coupons { get; set; }
        //public DbSet<ProductCoupon> ProductCoupons { get; set; }

        #endregion

        #region Invoice System

        public DbSet<Invoice> Invoices { get; set; }
        public DbSet<InvoiceLineItem> InvoiceLineItems { get; set; }
        public DbSet<InvoiceLineItemsName> InvoiceLineItemNames { get; set; }
        public DbSet<InvoicePayment> InvoicePayments { get; set; }

        #endregion

        #region Inventory / Products

        //public DbSet<Product> Products { get; set; }
        //public DbSet<ProductCategory> ProductCategories { get; set; }

        #endregion

        #region Ticket System

        public DbSet<Ticket> Tickets { get; set; }
        public DbSet<TicketMessage> TicketMessages { get; set; }
        public DbSet<TicketStatus> TicketStatuses { get; set; }
        public DbSet<TicketType> TicketTypes { get; set; }
        public DbSet<TicketParticipant> TicketParticipants { get; set; }
        public DbSet<TicketAttachment> TicketAttachments { get; set; }

        #endregion


        #region DocumentProcessing

        public DbSet<Document> Documents { get; set; }
        public DbSet<Document_Field> DocumentFields { get; set; }
        public DbSet<DocumentFolder> DocumentFolders { get; set; }

        #endregion


        #region OEM Module

        public DbSet<DnsDesignField> DnsDesignField { get; set; }
        public DbSet<DnsRecord> DnsRecords { get; set; }

        #endregion


        #region ThirdPartyAuthentication

        public DbSet<ThirdPartyAuthentication> ThirdPartyAuthentications { get; set; }

        #endregion


        protected override void OnModelCreating(ModelBuilder builder)
        {

            #region Ticket System

            builder.Entity<Ticket>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.TicketStatus)
                  .WithMany(u => u.Tickets)
                  .HasForeignKey(rf => rf.TicketStatusId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.TicketType)
                  .WithMany(u => u.Tickets)
                  .HasForeignKey(rf => rf.TicketTypeId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.CreatedBy)
                  .WithMany(u => u.Tickets)
                  .HasForeignKey(rf => rf.CreatedById)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<TicketParticipant>(entity =>
            {
                entity.HasKey(e => new { e.TicketId, e.UserId });

                entity.HasOne(e => e.Ticket)
                  .WithMany(u => u.TicketParticipants)
                  .HasForeignKey(rf => rf.TicketId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.AppUser)
                  .WithMany(u => u.TicketParticipants)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<TicketMessage>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Ticket)
                  .WithMany(u => u.TicketMessages)
                  .HasForeignKey(rf => rf.TicketId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.CreatedByUser)
                  .WithMany(u => u.TicketMessages)
                  .HasForeignKey(rf => rf.CreatedByUserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<TicketType>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<TicketStatus>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<TicketAttachment>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Ticket)
                  .WithMany(u => u.TicketAttachments)
                  .HasForeignKey(rf => rf.TicketId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            #endregion


            #region DocumentProcessing

            builder.Entity<Document>(entity =>
            {
                entity.HasKey(e => e.Id);


            });


            builder.Entity<Document_Field>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Document)
                  .WithMany(u => u.DocumentFields)
                  .HasForeignKey(rf => rf.DocumentId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<ThirdPartyAuthentication>(entity =>
            {
                entity.HasKey(e => e.ThirdPartyAuthenticationType);
            });

            builder.Entity<DocumentFolder>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                  .WithMany(u => u.DocumentFolders)
                  .HasForeignKey(rf => rf.CompanyId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.UploadedByUser)
                  .WithMany(u => u.DocumentFolders)
                  .HasForeignKey(rf => rf.UploadedByUserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);


            });


            #endregion




            #region OEM Module

            builder.Entity<DnsRecord>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                  .WithMany(u => u.DnsRecords)
                  .HasForeignKey(rf => rf.CompanyId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<DnsDesignField>(entity =>
            {
                entity.HasKey(e => e.DnsRecordId);

                entity.HasOne(e => e.DnsRecord)
                  .WithMany(u => u.DnsDesignFields)
                  .HasForeignKey(rf => rf.DnsRecordId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Company)
                  .WithMany(u => u.DnsDesignFields)
                  .HasForeignKey(rf => rf.CompanyId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });


            #endregion








            builder.Entity<AppUser>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                    .WithMany(m => m.Users)
                    .HasForeignKey(rf => rf.CompanyId)
                    .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.Location)
                    .WithMany(m => m.Users)
                    .HasForeignKey(rf => rf.LocationId)
                    .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<Company>(entity =>
            {
                entity.HasKey(e => e.Id);
            });

            builder.Entity<Location>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.Company)
                  .WithMany(u => u.Locations)
                  .HasForeignKey(rf => rf.CompanyId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<Wallet>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                  .WithMany(u => u.Cards)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            builder.Entity<StoreCredit>(entity =>
            {
                entity.HasKey(e => e.Id);

                entity.HasOne(e => e.User)
                  .WithMany(u => u.StoreCredits)
                  .HasForeignKey(rf => rf.UserId)
                  .OnDelete(DeleteBehavior.ClientSetNull);

                entity.HasOne(e => e.GiftFromUser)
                  .WithMany(u => u.GiftedCredit)
                  .HasForeignKey(rf => rf.GiftFromId)
                  .OnDelete(DeleteBehavior.ClientSetNull);
            });

            // keep at the bottom
            base.OnModelCreating(builder);
        }
    }
}
