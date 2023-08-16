using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _userRepository.GetUsers());
        }

        [HttpGet]
        [Route("GetUserById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _userRepository.GetUserById(Id));
        }

        [HttpPost]
        [Route("InsertUser")]
        public async Task<IActionResult> Post(User user)
        {
            var errors = _userRepository.UserValidation(user);
            if (errors.Count > 0)
            {
                return BadRequest(errors.FirstOrDefault());
            }
            else
            {
                await _userRepository.InsertUser(user);
                return Ok("Added Successfully");
            }
        }

        [HttpPut]
        [Route("UpdateUser")]
        public async Task<IActionResult> Put(User user)
        {
            var errors = _userRepository.UserValidation(user);
            if (errors.Count > 0)
            {
                return BadRequest(errors.FirstOrDefault());
            }
            else
            {
                await _userRepository.UpdateUser(user);
                return Ok("Updated Successfully");
            }
        }

        [HttpDelete]
        [Route("DeleteUser")]
        public JsonResult Delete(int Id)
        {
            _userRepository.DeleteUser(Id);
            return new JsonResult("Deleted SuccessFully");
        }
    }
}
