using Microsoft.AspNetCore.Mvc;

namespace RannaSoftwareTask2Project.UI.Controllers
{
    public class UserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
