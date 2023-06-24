using AuthScape.StripePayment.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class TestStripeController : ControllerBase
    {
        readonly IStripePayService stripePayService;
        public TestStripeController(IStripePayService stripePayService)
        {
            this.stripePayService = stripePayService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateInvoice()
        {
            var customerId = await stripePayService.CreateCustomer("John Doe", "johndoe@gmail.com", "", 
                "3025 Carrington Mill Boulevard Suite 200", "Morrisville", "NC", "27560");

            var invoiceId = await stripePayService.CreateInvoice(customerId, true);

            await stripePayService.CreateItemForInvoice(customerId, invoiceId, "Name1", 10.95m, 2);
            await stripePayService.CreateItemForInvoice(customerId, invoiceId, "Name2", 10.95m, 5);

            return Ok(new
            {
                invoiceId = invoiceId,
                customerId = customerId
            });
        }

        [HttpPost]
        public async Task<IActionResult> PayInvoice(InvoicePayParamer param)
        {
            await stripePayService.PayInvoice(param.InvoiceId, param.PaymentMethodId);
            return Ok();
        }

        [HttpPost]
        public async Task<IActionResult> DeleteDraftInvoice(InvoiceParamer param)
        {
            await stripePayService.DeleteDraftInvoice(param.InvoiceId);
            return Ok();
        }
    }

    public class InvoicePayParamer
    {
        public string InvoiceId { get; set; }
        public string PaymentMethodId { get; set; }
    }

    public class InvoiceParamer
    {
        public string InvoiceId { get; set; }
    }
}
