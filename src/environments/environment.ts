// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { initializeApp } from "firebase/app";
import * as firebase from "firebase/compat";

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyAcvC4fAZ6_RhSYpdtr8OSqDXVFdbo-yV8",
    authDomain: "listawycieczek.firebaseapp.com",
    databaseURL: "https://listawycieczek-default-rtdb.firebaseio.com",
    projectId: "listawycieczek",
    storageBucket: "listawycieczek.appspot.com",
    messagingSenderId: "810038939252",
    appId: "1:810038939252:web:8c68b336f89a74d5c04b21",
    measurementId: "G-0GQVSVJ27M"
  },
};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
