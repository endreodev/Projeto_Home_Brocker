// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.

import { IpService } from "../app/service/ip.service";

// The list of file replacements can be found in `angular.json`.
const localIP = IpService


export const environment = {
  production: true,
  // BASEURL: `http://104.234.200.32:5000`
  BASEURL: `https://goldbeam.com.br:5000`,

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


export const ambiente = {
  production: true,
  firebase: { 
    apiKey: "AIzaSyC-9OLaUHnD8lo39K8VN0vvlqvo2_69gfI",
    authDomain: "homebrokerdtvm.firebaseapp.com",
    projectId: "homebrokerdtvm",
    storageBucket: "homebrokerdtvm.appspot.com",
    messagingSenderId: "623742963048",
    appId: "1:623742963048:web:247d2f9d3648d33f685add",
    measurementId: "G-61J2XSH97C",
    vapidKey: "BBDmlBu0yklCnx650ET3VCx2PRqj-dfdwrYDmpgjh3nbZR_tx4DIQRiz3EkHEwtLCDtm4a2k6rT48iUWNSQzvjM"
  }, 
};