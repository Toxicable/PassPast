using System;
using System.Threading.Tasks;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security.Infrastructure;
using OAuthAPI.Data.Identity;
using OAuthAPI.WebApi.Api.Helpers;
using OAuthAPI.WebApi.Api.Identity.Managers;

namespace OAuthAPI.WebApi.Api.Identity.Providers
{
    public class RefreshTokenProvider : IAuthenticationTokenProvider
    {
        public void Create(AuthenticationTokenCreateContext context)
        {
            CreateAsync(context).Wait();
        }

        public async Task CreateAsync(AuthenticationTokenCreateContext context)
        {
            if(!context.Ticket.Properties.Dictionary.ContainsKey("as:client_id"))
            {
                return;
            }
            var clientid = context.Ticket.Properties.Dictionary["as:client_id"];

            if (string.IsNullOrEmpty(clientid))
            {
                return;
            }

            var refreshTokenId = Guid.NewGuid().ToString("n");


            var userManager = context.OwinContext.GetUserManager<ApplicationUserManager>();


            var refreshTokenLifeTime = context.OwinContext.Get<string>("as:clientRefreshTokenLifeTime");
            var clientManager = new ClientManager();
            var refreshTokenManager = new RefreshTokenManager();

            var token = new RefreshToken()
            {
                Id = AuthHelper.GetHash(refreshTokenId),
                Client = clientManager.FindClient(clientid),
                User = await userManager.FindByNameAsync(context.Ticket.Identity.Name),
                Issued = DateTime.UtcNow,
                Expires = DateTime.UtcNow.AddMinutes(Convert.ToDouble(refreshTokenLifeTime))
            };

            context.Ticket.Properties.IssuedUtc = token.Issued;
            context.Ticket.Properties.ExpiresUtc = token.Expires;

            token.ProtectedTicket = context.SerializeTicket();

            var result = await refreshTokenManager.AddRefreshToken(token);
            //something went wrong here

            if (result)
            {
                context.SetToken(refreshTokenId);
            }

            
        }

        public void Receive(AuthenticationTokenReceiveContext context)
        {
            ReceiveAsync(context).Wait();
        }

        public async Task ReceiveAsync(AuthenticationTokenReceiveContext context)
        {

            string hashedTokenId = AuthHelper.GetHash(context.Token);

            var clientManager = new ClientManager();
            var refreshTokenManager = new RefreshTokenManager();

            var refreshToken = await refreshTokenManager.FindRefreshToken(hashedTokenId);
            //if it is null then this probably means that you're trying with an old token

            if(refreshToken == null)
            {
                //tokens expired
                //context.Response.Response.errSetError("invalid_clientId", "ClientId should be sent.");
            }

            if (refreshToken != null)
            {
                //Get protectedTicket from refreshToken class
                context.DeserializeTicket(refreshToken.ProtectedTicket);
                var result = await refreshTokenManager.RemoveRefreshToken(hashedTokenId);
            }
        }
    }
}
