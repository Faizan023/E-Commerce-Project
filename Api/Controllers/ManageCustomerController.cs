using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class ManageCustomerController : ControllerBase
    {
        private readonly IManageCustomerRepository _ManageRepository;

        public ManageCustomerController(IManageCustomerRepository ManageRepository)
        {
            _ManageRepository = ManageRepository;
        }

        [HttpGet]
        [Route("GetCustomer")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ManageRepository.GetCustomer());
        }

        [HttpGet]
        [Route("GetCustomerById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _ManageRepository.GetCustomerById(Id));
        }

        [HttpPut]
        [Route("UpdateCustomer")]
        public async Task<IActionResult> Put(ManageCustomer customer)
        {
            var errors = _ManageRepository.AddValidation(customer);
            {
                if (errors.Count > 0)
                {
                    return BadRequest(errors.FirstOrDefault());
                }
                else
                {
                    await _ManageRepository.UpdateCustomer(customer);
                    return Ok("Updated Successfully");
                }
            }
        }
    }
}
