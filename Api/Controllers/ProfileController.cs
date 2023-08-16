using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public ProfileController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpPut]
        [Route("UpdateProfile")]
        public async Task<IActionResult> Put(Customer customer)
        {
            _customerRepository.UpdateCustomer(customer);
            return Ok("Updated Successfully");
        }
    }
}
