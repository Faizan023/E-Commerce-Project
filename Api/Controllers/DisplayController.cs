using Microsoft.AspNetCore.Mvc;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class DisplaController : ControllerBase
    {
        private readonly IProductRepository _productRepository;

        public DisplaController(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        [HttpGet]
        [Route("DisplayProduct")]
        public async Task<IActionResult> get()
        {
            return Ok(await _productRepository.GetProducts());
        }

        [HttpGet]
        [Route("DisplayProductById")]
        public async Task<IActionResult> GetDisplayById(int Id)
        {
            return Ok(await _productRepository.GetProductById(Id));
        }
    }
}
