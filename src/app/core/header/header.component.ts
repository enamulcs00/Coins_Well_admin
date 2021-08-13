import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { environment } from 'src/environments/environment';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	constructor(private _noti: NotificationsService, private _router: Router) {
	
	 }

	ngOnInit(): void {
	}
  
	logoutMe() {
		this._noti.confirm("Logout!", "Do you want to logout ?").subscribe(x => {
			if (x) {
				localStorage.removeItem(environment.storageKey);
				this._router.navigate(['/auth/login'])
			}
		})
	}
	

}
