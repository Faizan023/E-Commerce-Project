using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class MyOrder : ControllerBase
    {
        private readonly IOrderRepository _orderRepository;

        public MyOrder(IOrderRepository orderRepository)
        {
            _orderRepository = orderRepository;
        }

        [HttpGet]
        [Route("GetMyOrder")]
        public async Task<IActionResult> GetMyOrder()
        {
            return Ok(await _orderRepository.GetOrders());
        }

        [HttpGet]
        [Route("GetMyOrderById")]
        public async Task<IActionResult> GetMYOrderById(int Id)
        {
            return Ok(await _orderRepository.GetOrderById(Id));
        }

        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> Post(Order order)
        {
            await _orderRepository.AddOrder(order);
            return Ok("Addedd Successfully");
        }

        [HttpDelete]
        [Route("DeleteOrder")]
        public JsonResult Delete(int Id)
        {
            _orderRepository.DeleteOrder(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
