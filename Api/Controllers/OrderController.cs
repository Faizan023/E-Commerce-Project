using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public OrderController(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        [Route("GetOrders")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _orderRepository.GetOrders());
        }

        [HttpGet]
        [Route("GetOrderById")]
        public async Task<IActionResult> GetProductById(int Id)
        {
            return Ok(await _orderRepository.GetOrderById(Id));
        }

        [HttpPut]
        [Route("UpdateOrder")]
        public async Task<IActionResult> Put(Order order)
        {
            await _orderRepository.UpdateOrder(order);
            return Ok("Added Successfully");
        }
    }
}
