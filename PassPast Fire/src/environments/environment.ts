// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  gaTrackingId: 'UA-91391885-2',
  gaMode: 'none',
  firebaseConfig: {
    apiKey: 'AIzaSyA2hJW-dMxigmsP4-D4qGJeGPGhPW5CdkQ',
    authDomain: 'pass-past-dev.firebaseapp.com',
    databaseURL: 'https://pass-past-dev.firebaseio.com',
    storageBucket: 'pass-past-dev.appspot.com',
    messagingSenderId: '406000911823'
  }
};
