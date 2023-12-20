using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    public class CountController : ControllerBase
    {
        Count count = new Count();
        private readonly ICartRepository cartRepository;

        public CountController(ICartRepository _cartRepository)
        {
            cartRepository = _cartRepository;
        }

        [HttpGet]
        [Route("GetCount")]
        public async Task<IActionResult> Count(int Id)
        {
            count.CartCount = await cartRepository.CartCount(Id);
            count.OrderCount = await cartRepository.OrderCount(Id);
            return Ok(count);
        }
    }
}
