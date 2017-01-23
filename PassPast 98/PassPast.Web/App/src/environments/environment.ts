// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

const baseUrl =
'http://localhost:4200/';
//'https://beta.passpast.net/';

export const environment = {
  production: false,
  googleAuthConfig: {
    redirect_uri: baseUrl + 'signin-google',
    client_id: '137170270322-3ik6cl5m55i4ft3ff6t7l9tm2f1abkvh.apps.googleusercontent.com',
    scopes: 'profile email'
  },
  facebookAuthConfig: {
    redirect_uri: baseUrl + 'signin-facebook',
    client_id: '311510702571628',
    scopes: 'email'
  },
  // replaced props
  apiBaseUrl: baseUrl + 'api',
//  signalRUrl: baseUrl + 'api/exam-hub',
signalRUrl: 'http://localhost:5000/api/exam-hub',

};
