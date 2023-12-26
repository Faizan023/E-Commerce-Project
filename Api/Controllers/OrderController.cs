using Azure;
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
        [Route("GetOrderBy/{Id}")]
        public async Task<IActionResult> GetProductById(int Id)
        {
            return Ok(await _orderRepository.GetOrderById(Id));
        }

        [HttpPost]
        [Route("AddOrder")]
        public async Task<IActionResult> Post(Order order)
        {
            await _orderRepository.AddOrder(order);
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("UpdateOrder")]
        public async Task<IActionResult> Put(Order order)
        {
            await _orderRepository.UpdateOrder(order);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteOrder/{Id}")]
        public JsonResult Delete(int Id)
        {
            _orderRepository.DeleteOrder(Id);
            return new JsonResult("Deleted Successfully");
        }

        [HttpGet]
        [Route("getOrderbyCustomer/{Id}")]
        public async Task<IActionResult> GetCustomerOrder(int Id)
        {
            return Ok(await _orderRepository.GetCustomerOrder(Id));
        }
    }
}
