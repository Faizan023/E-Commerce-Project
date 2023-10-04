using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;

// for admin side login

namespace Controllers
{
    [Route("api/Controller")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly Context _context;
        public IConfiguration _configuration;

        public LoginController(Context context, IConfiguration configuration)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> Post(Login login)
        {
            var user = await GetUser(login);
            if (user != null)
            {
                var token = GenerateToken(user);
                return Ok(token);
            }
            return Ok("Check Email or Password");
        }

        private string GenerateToken(User user)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Email", user.Email)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(10),
                signingCredentials: signIn
            );
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<User?> GetUser(Login login)
        {
            var result = await _context.Users.FirstOrDefaultAsync(
                u => u.Email.ToLower() == login.Email.ToLower() && u.Password == login.Password
            );
            if (result != null)
            {
                return result;
            }
            return null;
        }
    }
}
