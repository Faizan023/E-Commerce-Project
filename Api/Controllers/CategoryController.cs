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
        [Route("GetCategoryById")]
        public async Task<IActionResult> GetById(int Id)
        {
            return Ok(await _CategoryRepository.GetCategoryById(Id));
        }

        [HttpPost]
        [Route("InsertCategory")]
        public async Task<IActionResult> post(ProductCategory category)
        {
            await _CategoryRepository.InsertCategory(category);
            return Ok("Added Successfully");
        }

        [HttpPut]
        [Route("UpdateCategory")]
        public async Task<IActionResult> Put(ProductCategory category)
        {
            await _CategoryRepository.UpdateCategory(category);
            return Ok("Updated Successfully");
        }

        [HttpDelete]
        [Route("DeleteCategory")]
        public JsonResult Delete(int Id)
        {
            _CategoryRepository.DeleteCategory(Id);
            return new JsonResult("Deleted Successfully");
        }
    }
}
