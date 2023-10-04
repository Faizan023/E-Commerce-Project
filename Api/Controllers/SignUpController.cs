using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

// For New Customer Registeration

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
