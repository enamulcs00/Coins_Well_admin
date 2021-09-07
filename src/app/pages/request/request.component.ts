import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-request',
	templateUrl: './request.component.html',
	styleUrls: ['./request.component.scss']
})
export class RequestComponent implements OnInit {
	items: any;
	value : string = '2/5/';
	getUnreadCounts: any;

constructor(private commn_: CommonService) { }
	
	onSelect(data: string): void {
		this.value = data;
		if(data == '2/5/') {
			this.commn_.put(urls.readunReadRequest+'2/').subscribe(data=>{
				this.commn_.onReadNotification.next('');
			});	
		}
		if(data == '1/5/') {
			this.commn_.put(urls.readunReadRequest+'1/').subscribe(data=>{
				this.commn_.onReadNotification.next('');
			});	
		}
		if(data == '4/3/') {
			this.commn_.put(urls.readunReadRequest+'3/').subscribe(data=>{
				this.commn_.onReadNotification.next('');
			});	
		}
		if(data == '3/3/') {
			this.commn_.put(urls.readunReadRequest+'4/').subscribe(data=>{
				this.commn_.onReadNotification.next('');
			});	
		}
	}
	ngOnInit(): void {
		this.getAllCurrency();
		this.commn_.onReadNotification.subscribe(data=>{
			this.commn_.get(urls.getunReadRequest).subscribe(data=>{
				this.getUnreadCounts = data.data;
			});	
		});
		this.commn_.put(urls.readunReadRequest+'2/').subscribe(data=>{
			this.commn_.onReadNotification.next('');
			// this.getUnreadCounts = data.data;
		});	
	}

	getAllCurrency() {
		this.commn_.get(urls.getAllCurrency).subscribe(res => {
			this.items = res.data.filter(x => {
				if([3, 4, 5].indexOf(x.id) == -1) {
					return true
				} else {
					return false;
				}
			});
		});
	}

}
