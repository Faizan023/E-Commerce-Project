using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        DashboardCountModel dashboard = new DashboardCountModel();
        private readonly ICustomerRepository _CustomerRepository;
        private readonly IOrderRepository _OrderRepository;

        public DashboardController(
            ICustomerRepository customerRepository,
            IOrderRepository orderRepository
        )
        {
            _CustomerRepository = customerRepository;
            _OrderRepository = orderRepository;
        }

        [HttpGet]
        [Route("DashboardCount")]
        public async Task<IActionResult> Get()
        {
            dashboard.CustomerCount = await _CustomerRepository.CustomerCount();
            return Ok(dashboard);
        }

        [HttpGet]
        [Route("OrderCount")]
        public async Task<IActionResult> GetOrderCount()
        {
            dashboard.SalesCount = await _OrderRepository.GetOrderCount();
            return Ok(dashboard);
        }

        // [HttpGet]
        // [Route("Revenue")]
        // public async Task<IActionResult> GetRevenue(){
        //     dashboard.
        // }
    }
}
