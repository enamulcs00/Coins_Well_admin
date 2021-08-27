// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
// ng build --base-href "/Coinswell/admin/"
export const environment = {
	production: false,
	baseUrl: 'https://python.appgrowthcompany.com/api/',
	imgBaseUrl: 'https://python.appgrowthcompany.com',
	storageKey: 'coinsWellAdminLogin',
	dateFormatWithTime: 'MM-DD-YYYY hh:mm A',
	firebaseConfig: {
        apiKey: "AIzaSyBL191NHbgrsavLmZjGDdiCg94hMN_YjDE",
        authDomain: "coinswell.firebaseapp.com",
        projectId: "coinswell",
        storageBucket: "coinswell.appspot.com",
        messagingSenderId: "865125792184",
        appId: "1:865125792184:web:d4960bdf4521823c15b74d",
        measurementId: "G-MW1VK0SK0D"
    },
	dateFormat: 'MM-DD-YYYY',
	resetPasswordLink: 'http://localhost:4200/resetpassword',
	homeURL: 'https://python.appgrowthcompany.com',
	googleMapKey: 'AIzaSyC7Ju90BCi9a01akYUWBvrEOFzwl8yxWZ8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
