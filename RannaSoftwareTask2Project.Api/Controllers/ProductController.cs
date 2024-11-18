using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using RannaSoftwareTask2Project.Business.Abstract;
using RannaSoftwareTask2Project.Entity;
using RannaSoftwareTask2Project.Entity.Entities;
using System.Security.Claims;

namespace RannaSoftwareTask2Project.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService productService;

        public ProductController(IProductService productService)
        {
            this.productService = productService;
        }

        [HttpPost]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> ProductAdd(ProductDto product)
        {
            await productService.ProductAddAsync(product,product.FileImage);
            return Ok();
        }

        [HttpDelete]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> ProductDelete(int id)
        {
            try
            {
                await productService.ProductDeleteAsync(id);
                return Ok();
            }
            catch (ArgumentNullException ex)
            {
                return BadRequest(new
                {
                    Title = "Hata",
                    Message = ex.Message
                });
            }
        }

        [HttpGet]
        public async Task<IActionResult> ProductGetAll()
        {
            var product=await productService.ProductGetAllAsync(); 
            return Ok(product);
        }

        [HttpGet]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> ProductGetById(int id)
        {
            return Ok(await productService.GetByIdProductAsync(id));
        }

        [HttpGet]
        public async Task<IActionResult> GetByIdUser(int id)
        {
            var product = await productService.GetByIdUserAsync(id);
            return Ok(product);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,User")]
        public async Task<IActionResult> UpdateProduct(ProductDto productDto)
        {
            var result = await productService.ProductUpdate(productDto,productDto.FileImage,productDto.CurrentImage);
            if(result==false)
            {
                return BadRequest("hatalı");
            }
            return Ok();
        }
     
    }
}
