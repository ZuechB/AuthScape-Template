using AuthScape.Models.PaymentGateway;
using AuthScape.Models.PaymentGateway.Stripe;
using AuthScape.Services;
using AuthScape.StripePayment.Models;
using AuthScape.StripePayment.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using OpenIddict.Validation.AspNetCore;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class PaymentController : ControllerBase
    {
        readonly IStripePayService stripePayService;
        readonly IUserManagementService userManagementService;
        public PaymentController(IStripePayService stripePayService, IUserManagementService userManagementService)
        {
            this.stripePayService = stripePayService;
            this.userManagementService = userManagementService;
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ConnectCustomer(PaymentRequest paymentRequest)
        {
            return Ok(await stripePayService.ConnectCustomer(await userManagementService.GetSignedInUser(), paymentRequest));
        }

        [HttpPost]
        public async Task<IActionResult> ConnectCustomerNoAuth(PaymentRequest paymentRequest)
        {
            return Ok(await stripePayService.ConnectCustomer(null, paymentRequest));
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> SetupStripeConnect()
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            return Ok(await stripePayService.SetupStripeConnect(signedInUser));
        }

        [HttpPost]
        public async Task<IActionResult> GeneratePaymentLink(PaymentLinkParam param)
        {
            return Ok(await stripePayService.GeneratePaymentLink(param));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> Charge(ChargeParam param)
        {
            return Ok(await stripePayService.Charge(await userManagementService.GetSignedInUser(), param));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> ChargeWithExistingPayment(ChargeWithExistingPaymentParam param)
        {
            await stripePayService.ChargeWithExistingPayment(await userManagementService.GetSignedInUser(), param.InvoiceId, param.WalletId, param.Amount);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> GetPaymentMethods()
        {
            var paymentMethods = await stripePayService.GetPaymentMethods(await userManagementService.GetSignedInUser());
            return Ok(paymentMethods);
        }

        [HttpPost]
        public async Task<IActionResult> AttachCustomerToPaymentMethod(PaymentMethodAttachParam param)
        {
            await stripePayService.AttachPaymentMethodToCustomer(param.CustomerId, param.PaymentMethodId);
            return Ok();
        }

        [HttpGet]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> CheckIfACHNeedValidation()
        {
            return Ok(await stripePayService.ACHNeedValidation(await userManagementService.GetSignedInUser()));
        }

        [HttpPost]
        [Authorize(AuthenticationSchemes = OpenIddictValidationAspNetCoreDefaults.AuthenticationScheme)]
        public async Task<IActionResult> AddPaymentMethod(SavePaymentMethod savePaymentMethod)
        {
            var signedInUser = await userManagementService.GetSignedInUser();
            return Ok(await stripePayService.AddPaymentMethodForCompany(signedInUser, savePaymentMethod.PaymentMethodId));
        }
    }

    public class SavePaymentMethod
    {
        public string PaymentMethodId { get; set; }
    }

    public class PaymentMethodSyncParam
    {
        public string payment_intent { get; set; }
        public long? invoiceId { get; set; }
    }

    public class ChargeWithExistingPaymentParam
    {
        public long InvoiceId { get; set; }
        public long WalletId { get; set; }
        public decimal Amount { get; set; }
    }

    public class PaymentMethodAttachParam
    {
        public string CustomerId { get; set; }
        public string PaymentMethodId { get; set; }
    }
}
