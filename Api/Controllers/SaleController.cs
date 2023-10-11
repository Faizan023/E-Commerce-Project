using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class SaleController : ControllerBase
    {
        private readonly ISaleRepository _saleRepository;

        public SaleController(ISaleRepository saleRepository)
        {
            _saleRepository = saleRepository;
        }

        [HttpGet]
        [Route("GetSales")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _saleRepository.GetSales());
        }

        [HttpGet]
        [Route("GetSaleById/{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _saleRepository.GetSaleById(Id));
        }

        [HttpPost]
        [Route("InsertSale")]
        public async Task<IActionResult> Post(Sale sale)
        {
            await _saleRepository.InsertSale(sale);
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("UpdateSale/{Id}")]
        public async Task<IActionResult> Put(Sale sale)
        {
            await _saleRepository.UpdateSale(sale);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteSale/{Id}")]
        public JsonResult Delete(int Id)
        {
            _saleRepository.DeleteSale(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
