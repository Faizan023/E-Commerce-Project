using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _customerRepository;

        public CustomerController(ICustomerRepository customerRepository)
        {
            _customerRepository = customerRepository;
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _customerRepository.GetCustomer());
        }

        [HttpGet]
        [Route("GetCustomerById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _customerRepository.GetCustomerById(Id));
        }

        [HttpPost]
        [Route("InsertCustomer")]
        public async Task<IActionResult> Post(Customer customer)
        {
            var errors = _customerRepository.AddValidation(customer);
            if (errors.Count > 0)
            {
                return BadRequest(errors.FirstOrDefault());
            }
            else
            {
                var result = await _customerRepository.InsertCustomer(customer);
                if (result.Id == 0)
                {
                    return StatusCode(
                        StatusCodes.Status500InternalServerError,
                        "Something Went Wrong"
                    );
                }
                return Ok("Added SuccessFully");
            }
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        public async Task<IActionResult> Put(Customer customer)
        {
            var errors = _customerRepository.AddValidation(customer);
            {
                if (errors.Count > 0)
                {
                    return BadRequest(errors.FirstOrDefault());
                }
                else
                {
                    await _customerRepository.UpdateCustomer(customer);
                    return Ok("Updated Successfully");
                }
            }
        }

        [HttpDelete]
        [Route("DeleteCustomer")]
        public JsonResult Delete(int Id)
        {
            _customerRepository.DeleteCustomer(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
