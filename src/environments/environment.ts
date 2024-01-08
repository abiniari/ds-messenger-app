// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'ds-messenger-bcac7',
    appId: '1:685849929675:web:895c7f6e495f5f8484b84e',
    storageBucket: 'ds-messenger-bcac7.appspot.com',
    apiKey: 'AIzaSyAuNxtPz_JvCBwOY6RHX1uiSLa_2iWWqTc',
    authDomain: 'ds-messenger-bcac7.firebaseapp.com',
    databaseUrl:'http://127.0.0.1:9000/?ns=ds-messenger-bcac7-default-rtdb',
    messagingSenderId: '685849929675',
  },
  useEmulators:true,
  production: false
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
