using Microsoft.AspNetCore.Mvc;

namespace RannaSoftwareTask2Project.UI.Controllers
{
    public class ProductController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> AddProduct()
        {
            return View();
        }
        public async Task<IActionResult> MyAddProduct()
        {
            return View();
        }

        public async Task<IActionResult> UpdateProduct()
        {
            return View();
        }

        public async Task<IActionResult> GetAllProduct()
        {
            return View();
        } 
        
        public async Task<IActionResult> GetMyProduct()
        {
            return View();
        }
    }
}
