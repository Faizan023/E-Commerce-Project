using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    public class CountController : ControllerBase
    {
        Count count = new Count();
        private readonly ICartRepository cartRepository;
        private readonly IWishlistRepository wishlistRepository;

        public CountController(ICartRepository _cartRepository, IWishlistRepository _whishlist)
        {
            cartRepository = _cartRepository;
            wishlistRepository = _whishlist;
        }

        [HttpGet]
        [Route("GetCount/{Id}")]
        public async Task<IActionResult> Count(int Id)
        {
            count.CartCount = await cartRepository.CartCount(Id);
            count.OrderCount = await cartRepository.OrderCount(Id);
            count.WhishlistCount = await wishlistRepository.GetWishlistCount(Id);
            count.CartTotal = await cartRepository.CartAmount(Id);
            return Ok(count);
        }
    }
}
