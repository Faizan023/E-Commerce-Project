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
            dashboard.RevenueCount = await _OrderRepository.Revenue();
            dashboard.SalesCount = await _OrderRepository.GetOrderCount();
            dashboard.CustomerCountMonth = await _CustomerRepository.CustomerCountMonth();
            dashboard.CustomerCountYear = await _CustomerRepository.CustomerCountYear();
            dashboard.SalesCountMonth = await _OrderRepository.GetOrderCountMonth();
            dashboard.RevenueCountMonth = await _OrderRepository.RevenueMonth();
            dashboard.SalesCountYear = await _OrderRepository.GetOrderCountyear();
            dashboard.RevenueCountYear = await _OrderRepository.RevenueYear();
            return Ok(dashboard);
        }

        // recently joined last 5 customer
        [HttpGet]
        [Route("RecentCustomer")]
        public async Task<IActionResult> RecentCustomer()
        {
            return Ok(await _CustomerRepository.RecentCustomer());
        }

        [HttpGet]
        [Route("RecentSelling")]
        public async Task<IActionResult> RecentTodaySelling()
        {
            return Ok(await _OrderRepository.TodayOrderList());
        }

        [HttpGet]
        [Route("MonthSelling")]
        public async Task<IActionResult> RecentMonthSelling()
        {
            return Ok(await _OrderRepository.MonthOrderList());
        }

        [HttpGet]
        [Route("YearSelling")]
        public async Task<IActionResult> RecentYearSelling()
        {
            return Ok(await _OrderRepository.YearOrderList());
        }
    }
}
