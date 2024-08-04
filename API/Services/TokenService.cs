using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Domain;
using Microsoft.IdentityModel.Tokens; //coming from nuget package Microsoft.IdentityModel.Tokens.JWT

namespace API.Services
{
    public class TokenService
    {
        private readonly IConfiguration _config;
        public TokenService(IConfiguration config)
        {
            _config = config;
        }
        public string CreateToken(AppUser user)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
                new Claim(ClaimTypes.Email, user.Email),
            };
            //signing credentials
            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(_config["TokenKey"]));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            //Build the token
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            //create token
            var tokenHandler = new JwtSecurityTokenHandler();
            
            //create token string
            var token = tokenHandler.CreateToken(tokenDescriptor);
            
            //return token string
            return tokenHandler.WriteToken(token);
        }
               
    }
}