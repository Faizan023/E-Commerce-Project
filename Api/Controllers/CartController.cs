using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class CartController : ControllerBase
    {
        private readonly ICartRepository cartRepository;

        public CartController(ICartRepository _cartRepository)
        {
            cartRepository = _cartRepository;
        }

        [HttpGet]
        [Route("GetCart")]
        public async Task<IActionResult> GetCart()
        {
            return Ok(await cartRepository.GetCarts());
        }

        [HttpGet]
        [Route("GetCartById")]
        public async Task<IActionResult> GetCartById(int Id)
        {
            return Ok(await cartRepository.GetCartById(Id));
        }

        [HttpPost]
        [Route("AddToCart")]
        public async Task<IActionResult> Post(Cart cart)
        {
            await cartRepository.AddToCart(cart);
            return Ok("Addedd Successfully");
        }

        [HttpDelete]
        [Route("RemoveCart")]
        public JsonResult Delete(int Id)
        {
            cartRepository.RemoveCart(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
