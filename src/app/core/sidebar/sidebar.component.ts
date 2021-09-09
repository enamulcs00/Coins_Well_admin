import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-sidebar',
	templateUrl: './sidebar.component.html',
	styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
	sum: number = 0;
	constructor(private commn_: CommonService) { }

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
