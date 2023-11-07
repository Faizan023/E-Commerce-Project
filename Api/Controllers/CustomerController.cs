using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly ICustomerRepository _CustomerRepository;

        public CustomerController(ICustomerRepository ManageRepository)
        {
            _CustomerRepository = ManageRepository;
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _CustomerRepository.GetCustomer());
        }

        [HttpGet]
        [Route("GetCustomerById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _CustomerRepository.GetCustomerById(Id));
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        public async Task<IActionResult> Put(Customer customer)
        {
            var errors = _CustomerRepository.AddValidation(customer);
            {
                if (errors.Count > 0)
                {
                    return BadRequest(errors.FirstOrDefault());
                }
                else
                {
                    await _CustomerRepository.UpdateCustomer(customer);
                    return Ok("Updated Successfully");
                }
            }
        }

        [HttpDelete]
        [Route("DeleteCustomer/{Id}")]
        public JsonResult Delete(int Id)
        {
            _CustomerRepository.DeleteCustomer(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
