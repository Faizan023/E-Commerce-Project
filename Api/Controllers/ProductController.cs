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

        private readonly IOrderRepository _OrderRepository;
        private readonly ICartRepository _CartRepository;
        public ProductController(IProductRepository productRepository, IOrderRepository orderRepository, ICartRepository cartRepository)
        {
            _ProductRepository = productRepository;
            _OrderRepository = orderRepository;
            _CartRepository = cartRepository;

        }

        [HttpGet]
        [Route("GetProduct")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _ProductRepository.GetProducts());
        }

        [HttpGet]
        [Route("GetProductBy/{Id}")]
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
        [Route("DeleteProduct/{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
            var product = await _ProductRepository.GetProductById(Id);
            
            if(product == null)
            {
                return BadRequest("Product not found");
            }

            //cart delete
            await _CartRepository.RemoveCartByProductId(Id);
            await _OrderRepository.RemoveOrderByProductId(Id);
            // order delete
            await _ProductRepository.DeleteProduct(Id);
            return Ok("Deleted Successfully");
        }


    }
}
