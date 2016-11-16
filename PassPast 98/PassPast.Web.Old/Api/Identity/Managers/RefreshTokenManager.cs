using System.Linq;
using System.Threading.Tasks;
using OAuthAPI.Data.Identity;

namespace OAuthAPI.WebApi.Api.Identity.Managers
{
    public class RefreshTokenManager : BaseManager
    {
        public async Task<bool> AddRefreshToken(RefreshToken token)
        {
            var existingToken = Context.RefreshTokens
                .SingleOrDefault(r => r.User.Id == token.User.Id && r.Client.Id == token.Client.Id);

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            Context.RefreshTokens.Add(token);

            return await Context.SaveChangesAsync() > 0;
        }


        public async Task<RefreshToken> FindRefreshToken(string refreshTokenEntityId)
        {
            var refreshTokenEntity = await Context.RefreshTokens.FindAsync(refreshTokenEntityId);

            return refreshTokenEntity;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshTokenEntity = await Context.RefreshTokens.FindAsync(refreshTokenId);

            if (refreshTokenEntity != null)
            {
                Context.RefreshTokens.Remove(refreshTokenEntity);
                return await Context.SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshTokenEntity)
        {
            Context.RefreshTokens.Remove(refreshTokenEntity);
            return await Context.SaveChangesAsync() > 0;
        }


    }
}