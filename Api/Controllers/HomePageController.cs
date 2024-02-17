using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class HomepageController : ControllerBase
    {
        private readonly IhomepageRepository ihomepageRepository;

        public HomepageController(IhomepageRepository _ihomepageRepository)
        {
            ihomepageRepository = _ihomepageRepository;
        }

        [HttpGet]
        [Route("GetFashionProduct")]
        public async Task<IActionResult> GetFashionProduct()
        {
            return Ok(await ihomepageRepository.GetFashion());
        }

        [HttpGet]
        [Route("GetMobiles")]
        public async Task<IActionResult> GetMobileProduct()
        {
            return Ok(await ihomepageRepository.GetMobiles());
        }

        [HttpGet]
        [Route("GetLaptop")]
        public async Task<IActionResult> GetLaptopProduct()
        {
            return Ok( await ihomepageRepository.GetLaptop());
        }
    }
}
