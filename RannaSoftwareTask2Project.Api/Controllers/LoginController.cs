using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using RannaSoftwareTask2Project.Business.Abstract;
using RannaSoftwareTask2Project.Entity.Entities;
using RannaSoftwareTask2Project.Entity.Model;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace RannaSoftwareTask2Project.Api.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;
        private readonly IUserService userService;

        public LoginController(IOptions<JwtSettings> jwtSettings, IUserService userService)
        {
            _jwtSettings = jwtSettings.Value;
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> Login(User user)
        {
            var person = await userService.GetByUserNameAsync(user.UserName);
            if (person == null)
            {
                return BadRequest();
            }
            if (person.RoleId == 1)
            {
                var token = GenerateJwtToken("Admin", person.Id ?? 0);
                return Ok(new { Token = token });
            }

            var tokenuser = GenerateJwtToken("User", person.Id ?? 0);
            return Ok(new { Token = tokenuser });
        }

        private string GenerateJwtToken(string role, int id)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings.Key));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, role),
            new Claim(ClaimTypes.Role, role),
            new Claim(ClaimTypes.NameIdentifier,id.ToString())
            };

            var token = new JwtSecurityToken(
                issuer: _jwtSettings.Issuer,
                audience: _jwtSettings.Audience,
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(_jwtSettings.ExpiresInMinutes),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
