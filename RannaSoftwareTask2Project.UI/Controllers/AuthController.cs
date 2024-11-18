using Microsoft.AspNetCore.Mvc;

namespace RannaSoftwareTask2Project.UI.Controllers
{
    public class AuthController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> Login()
        {
            return View();
        }
    }
}
