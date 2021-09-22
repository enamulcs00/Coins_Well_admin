import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	sum: number = 0;
	userInfo : any = JSON.parse(localStorage.getItem(environment.storageKey));
	permissions = this.userInfo.permissions;
	constructor(public commn_: CommonService) {
	}

	ngOnInit(): void {
		this.commn_.onReadNotification.subscribe(data => {
			this.commn_.put(urls.getunReadRequest).subscribe(data => {
				let sum = 0;
				Object.keys(data.data).forEach(value => {
					Object.values(data.data[value]).forEach(amount=>{
						sum += Number(amount);
					})
				})
				this.sum = sum;
			});
		})
	}

}
