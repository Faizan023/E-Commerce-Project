using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    // [Authorize]
    public class BrandController : ControllerBase
    {
        private readonly IBrandRepository brandRepository;
        private readonly IProductRepository productRepository;

        public BrandController(
            IBrandRepository _brandrepository,
            IProductRepository _productRepository
        )
        {
            brandRepository = _brandrepository;
            productRepository = _productRepository;
        }

        [HttpGet]
        [Route("GetBrands")]
        public async Task<IActionResult> Get()
        {
            return Ok(await brandRepository.GetBrands());
        }

        [HttpGet]
        [Route("GetBrandBy/{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await brandRepository.GetBrandById(Id));
        }

        [HttpPost]
        [Route("InsertBrand")]
        public async Task<IActionResult> Post(Brand brand)
        {
            var existing = brandRepository.BrandValidation(brand);
            if (existing.Count > 0)
            {
                return BadRequest(existing.FirstOrDefault());
            }
            else
            {
                await brandRepository.InsertBrand(brand);
                return Ok("Added Successfully");
            }
        }

        [HttpPut]
        [Route("UpdateBrand/{Id}")]
        public async Task<IActionResult> Put(Brand brand)
        {
            var existing = brandRepository.BrandValidation(brand);
            if (existing.Count > 0)
            {
                return BadRequest(existing.FirstOrDefault());
            }
            else
            {
                await brandRepository.UpdateBrand(brand);
                return Ok("Updated Successfully");
            }
        }

        [HttpDelete]
        [Route("DeleteBrand/{Id}")]
        public async Task<IActionResult> Delete(int Id)
        {
             brandRepository.DeleteBrand(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
