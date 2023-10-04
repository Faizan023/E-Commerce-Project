using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Models;

// For Customer Login and Get Jwt Tokens

namespace Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class SignInController : ControllerBase
    {
        private readonly Context context;
        public IConfiguration _configuration;

        public SignInController(Context _Context, IConfiguration configuration)
        {
            _configuration = configuration;
            context = _Context;
        }

        [HttpPost]
        [Route("LoginToken")]
        public async Task<IActionResult> LoginToken(Login _login)
        {
            var result = await GetToken(_login);
            if (result != null)
            {
                var token = Tokens(result);
                return Ok(token);
            }
            return Ok("Check Email or Password");
        }

        private string Tokens(Customer customer)
        {
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, _configuration["Jwt:Subject"]),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Iat, DateTime.UtcNow.ToString()),
                new Claim("Email", customer.Email),
                new Claim("password", customer.Password)
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

        private async Task<Customer?> GetToken(Login login)
        {
            var result = await context.Customers.FirstOrDefaultAsync(
                t => t.Email.ToLower() == login.Email.ToLower() && t.Password == login.Password
            );
            if (result != null)
            {
                return result;
            }
            return null;
        }
    }
}
