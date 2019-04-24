// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyCiRsz0SvHP8UpD_o6C9du_nHpBcDmv6-Q',
    authDomain: 'mastitime-projects.firebaseapp.com',
    databaseURL: 'https://mastitime-projects.firebaseio.com',
    projectId: 'mastitime-projects',
    storageBucket: 'mastitime-projects.appspot.com',
    messagingSenderId: '873517723368'
  }
};
