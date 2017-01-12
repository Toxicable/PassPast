export const environment = {
  production: true,
  apiBaseUrl: '/api',
  signalRUrl: 'https://beta.passpast.net/api/exam-hub',
  googleAuthConfig: {
    redirect_uri: 'https://beta.passpast.net/signin-google',
    client_id: '137170270322-3ik6cl5m55i4ft3ff6t7l9tm2f1abkvh.apps.googleusercontent.com',
    scopes: 'profile email'
  },
  facebookAuthConfig: {
    redirect_uri: 'https://beta.passpast.net/signin-facebook',
    client_id: '311510702571628',
    scopes: 'profile email'
  },
};
