using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class WishlistController : ControllerBase
    {
        private readonly IWishlistRepository _wishlistRepository;

        public WishlistController(IWishlistRepository wishlistRepository)
        {
            _wishlistRepository = wishlistRepository;
        }

        [HttpGet]
        [Route("GetWishlist")]
        public async Task<IActionResult> GetWishlist()
        {
            return Ok(await _wishlistRepository.GetWishlist());
        }

        [HttpGet]
        [Route("GetWishlist/{Id}")]
        public async Task<IActionResult> GetWishlistById(int Id)
        {
            return Ok(await _wishlistRepository.GetWishlistById(Id));
        }

        [HttpPost]
        [Route("InsertWishlist")]
        public async Task<IActionResult> Post(Wishlist wishlist)
        {
            await _wishlistRepository.InsertWishlist(wishlist);
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("UpdateWishlist")]
        public async Task<IActionResult> Put(Wishlist wishlist)
        {
            await _wishlistRepository.UpdateWishlist(wishlist);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteWishlist/{Id}")]
        public JsonResult Delete(int Id)
        {
            _wishlistRepository.DeleteWishlist(Id);
            return new JsonResult("Deleted Successfully");
        }

        [HttpGet]
        [Route("GetCustomerWishlist/{Id}")]
        public async Task<IActionResult> CustomerWishlist(int Id)
        {
            return Ok(await _wishlistRepository.GetCustomerWishlist(Id));
        }
    }
}
