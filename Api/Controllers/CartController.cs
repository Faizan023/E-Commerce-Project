using Microsoft.AspNetCore.Authorization;
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
        private readonly Context context;

        public CartController(ICartRepository _cartRepository, Context _context)
        {
            cartRepository = _cartRepository;
            context = _context;
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
        [Authorize]
        public async Task<IActionResult> Post(Cart cart)
        {
            await cartRepository.AddToCart(cart);
            return Ok("Addedd Successfully");
        }

        [HttpDelete]
        [Route("RemoveCart/{Id}")]
        public JsonResult Delete(int Id)
        {
            cartRepository.RemoveCart(Id);
            return new JsonResult("Deleted Successfully");
        }

        [HttpGet]
        [Route("getcartbycustomer/{Id}")]
        [Authorize]
        public async Task<IActionResult> GetCustomerCart(int Id)
        {
            return Ok(await cartRepository.GetCustomerCart(Id));
        }

        [HttpGet]
        [Route("GetCartCount/{Id}")]
        public async Task<IActionResult> GetCount(int Id)
        {
            return Ok(cartRepository.CartCount(Id));
        }
    }
}
