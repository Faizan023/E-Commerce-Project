using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class SignUpController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public SignUpController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpPost]
        [Route("InsertCustomer")]
        [EnableCors("AllowOrigin")]
        public async Task<IActionResult> Post(Customer customer)
        {
            // customer.CreatedDateTime = DateTime.Now;
            // customer.CreatedBy = 1;
            // customer.UpdatedDateTime = DateTime.Now;
            // customer.UpdatedBy = 1;
            // customer.Active = false;
            // customer.ActivationDate = DateTime.Now;
            // customer.ActivationKey = "Yes";
            var errors = _customerRepository.AddValidation(customer);
            if (errors.Count > 0)
            {
                return BadRequest(errors.FirstOrDefault());
            }
            else
            {
                await _customerRepository.InsertCustomer(customer);
                return Ok("Added Successfully");
            }
        }
    }
}
