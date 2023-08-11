using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository brandRepository;

        public BrandController(IBrandRepository _brandrepository)
        {
            brandRepository = _brandrepository;
        }

        [HttpGet]
        [Route("GetBrands")]
        public async Task<IActionResult> Get()
        {
            return Ok(await brandRepository.GetBrands());
        }

        [HttpGet]
        [Route("GetBrandById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await brandRepository.GetBrandById(Id));
        }

        [HttpPost]
        [Route("InsertBrand")]
        public async Task<IActionResult> Post(Brand brand)
        {
            await brandRepository.InsertBrand(brand);
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("UpdateBrand")]
        public async Task<IActionResult> Put(Brand brand)
        {
            await brandRepository.UpdateBrand(brand);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteBrand")]
        public JsonResult Delete(int Id)
        {
            brandRepository.DeleteBrand(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
