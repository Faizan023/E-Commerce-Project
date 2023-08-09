using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductRepository _ProductRepository;

        public ProductController(IProductRepository productRepository)
        {
            _ProductRepository = productRepository;
        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ProductRepository.GetProducts());
        }

        [HttpGet]
        [Route("GetProductById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _ProductRepository.GetProductById(Id));
        }

        [HttpPost]
        [Route("InsertProduct")]
        public async Task<IActionResult> Post(Product product)
        {
            var result = await _ProductRepository.InsertProduct(product);
            if (result.Id == 0)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Something Went Wrong");
            }
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("UpdateProduct")]
        public async Task<IActionResult> Put(Product product)
        {
            await _ProductRepository.UpdateProduct(product);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteProduct")]
        public JsonResult Delete(int Id)
        {
            _ProductRepository.DeleteProduct(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
