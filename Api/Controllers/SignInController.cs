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
                // return Ok(token);
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
                new Claim("id", customer.Id.ToString()),
                new Claim("email", customer.Email),
                new Claim("firstName", customer.FirstName),
                new Claim("lastName", customer.LastName),
                new Claim("gender", customer.Gender),
                new Claim("phoneNumber", customer.PhoneNumber),
                new Claim("dateOfBirth", customer.DateOfBirth.ToString()),
                new Claim("address", customer.Address),
                new Claim("createdDateTime", customer.CreatedDateTime.ToString()),
                new Claim("Password", customer.Password),
                new Claim("createdBy", customer.CreatedBy.ToString()),
                new Claim("updatedDateTime", customer.UpdatedDateTime.ToString()),
                new Claim("updatedBy", customer.UpdatedBy.ToString()),
                new Claim("active", customer.Active.ToString()),
                new Claim("activationDate", customer.ActivationDate.ToString()),
                new Claim("activationKey", customer.ActivationKey)
            };
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.UtcNow.AddMinutes(59),
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
