import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';


@Component({
	selector: 'app-header',
	templateUrl: './header.component.html',
	styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
	imgurl: string;

	constructor(private _noti: NotificationsService, private _router: Router, private commn_: CommonService) {

	}

	ngOnInit(): void {
		this.fetchImage();
	}

	logoutMe() {
		this._noti.confirm("Logout!", "Do you want to logout ?").subscribe(x => {
			if (x) {
				localStorage.removeItem(environment.storageKey);
				this._router.navigate(['/auth/login'])
			}
		})
	}

	fetchImage() {
		this.commn_.get('admin/get-profile/').subscribe(res => {
			if(res.data?.image != null) {
				this.imgurl = environment.homeURL + res.data?.image?.media_file;
			}
		});
		this.commn_.imageFlag.subscribe(res => {
			this.commn_.get('admin/get-profile/').subscribe(res => {
				if(res.data?.image != null) {
					this.imgurl = environment.homeURL + res.data?.image?.media_file;
				}
			});
		})
	}

}
