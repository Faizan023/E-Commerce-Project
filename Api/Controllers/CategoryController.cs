using Microsoft.AspNetCore.Mvc;
using Models;
using Repository;

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryRepository _CategoryRepository;

        public CategoryController(ICategoryRepository CategoryRepository)
        {
            _CategoryRepository = CategoryRepository;
        }

        [HttpGet]
        [Route("GetCategories")]
        public async Task<IActionResult> Get()
        {
            return Ok(await _CategoryRepository.GetCategories());
        }

        [HttpGet]
        [Route("GetCategoryBy/{Id}")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _CategoryRepository.GetCategoryById(Id));
        }

        [HttpPost]
        [Route("InsertCategory")]
        public async Task<IActionResult> post(ProductCategory category)
        {
            var existing = _CategoryRepository.validdation(category);
            if (existing.Count() > 0)
            {
                return BadRequest(existing.FirstOrDefault());
            }
            else
            {
                await _CategoryRepository.InsertCategory(category);
                return Ok("Added Successfully");
            }
        }

        [HttpPut]
        [Route("UpdateCategory/{Id}")]
        public async Task<IActionResult> Put(ProductCategory category)
        {
            var existing = _CategoryRepository.validdation(category);
            if (existing.Count() > 0)
            {
                return BadRequest(existing.FirstOrDefault());
            }
            else
            {
                await _CategoryRepository.UpdateCategory(category);
                return Ok("Updated Successfully");
            }
        }

        [HttpDelete]
        [Route("DeleteCategory/{Id}")]
        public JsonResult Delete(int Id)
        {
            _CategoryRepository.DeleteCategory(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
