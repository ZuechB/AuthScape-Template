using AuthScape.Models;
using AuthScape.Models.PaymentGateway.Stripe;
using AuthScape.Plugins.Invoices.Models;
using Models.AppSettings;

namespace Services.Database
{
    public class AppSettings
    {
        public string Name { get; set; } // company or product name
        public Stage Stage { get; set; }
        public string IDPUrl { get; set; }
        public DatabaseConnnectionStrings DatabaseConnnectionStrings { get; set; }
        public StripeAppSetting Stripe { get; set; }
        public SendGridAppSettings SendGrid { get; set; }
        public InvoiceAppSetting InvoiceAppSetting { get; set; }
        public string WebsiteRedirectUrl { get; set; }
        public string InviteSignupRedirectUrl { get; set; }
        public string LoginRedirectUrl { get; set; }
        public TicketSystem Ticketing { get; set; }
        public OEMSettings OEM { get; set; }
        public DocumentProcessing DocumentProcessing { get; set; }
    }

    public class DocumentProcessing
    {
        public string BaseURL { get; set; }
        public string StorageConnectionString { get; set; }
        public string StorageContainer { get; set; }
        public string AzureFormRecognizerEndpoint { get; set; }
        public string AzureFormRecognizerKey { get; set; }
    }

    public class TicketSystem
    {
        public string TemplateId { get; set; }
        public string Domain { get; set; }
        public string Name { get; set; }
        public string Subject { get; set; }
    }

    public class DatabaseConnnectionStrings
    {
        public string Development { get; set; }
        public string Staging { get; set; }
        public string Production { get; set; }
    }

    public class InvoiceSettings
    {
        public string StorageConnectionString { get; set; }
    }

    public class OEMSettings
    {
        public string GoogleFontsAPIKey { get; set; }
    }

    public class ReportingSettings
    {
        public string ProjectName { get; set; }
    }

    public class FormRecognizerSettings
    {
        public string Key { get; set; }
        public string Endpoint { get; set; }
    }
}