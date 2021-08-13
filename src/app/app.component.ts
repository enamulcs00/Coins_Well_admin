import { Component } from '@angular/core';
import { Block } from 'notiflix';
import firebase from "firebase/app";
import "firebase/messaging";
import { SwPush, SwUpdate } from '@angular/service-worker';
import { AuthService } from 'src/app/_services/auth.service';
import { environment } from 'src/environments/environment';
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	title = 'angularlearn';
	serviceWorkerAttempt = 0;
	constructor(private updates: SwUpdate, push: SwPush,private _auth:AuthService) {
		Block.init({
			backgroundColor:"rgba(255,255,255,0.547)",
		});
			//Check if user is logged in or not.
			navigator.serviceWorker.register("ngsw-worker.js");
			firebase.initializeApp(environment.firebaseConfig);
			const setInt = () => {
				navigator.serviceWorker.getRegistration().then((swr: any) => {
					this.serviceWorkerAttempt++;
					if (swr != undefined) {
						firebase.messaging().useServiceWorker(swr);
						this.permitToNotify();
					} else {
						if (this.serviceWorkerAttempt > 0 && this.serviceWorkerAttempt < 3) {
							setInt();
						}
					}
				});
			};
			setInt();
			updates.available.subscribe((_) =>
				updates.activateUpdate().then(() => {
					// console.log("reload for update");
					document.location.reload();
				})
			);
			push.messages.subscribe((msg) => console.log("push message", msg));
			push.notificationClicks.subscribe((click) => {
				console.log("notification click", click);
			});
			self.addEventListener("notificationclick", function (event: any) {
				event.notification.close();
			});
	}
     
  
	permitToNotify() {
		const messaging = firebase.messaging();
		messaging
			.requestPermission()
			.then(() =>
				messaging.getToken().then((token: any) => {
					console.log("Token",token);
					this._auth.firebaseToken = token;
				})
			)
			.catch((_: any) => {
				//alert("Unable to get permission to notify.");
			});
	} 
}
