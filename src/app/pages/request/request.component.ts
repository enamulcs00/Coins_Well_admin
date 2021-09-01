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

constructor(private commn_: CommonService) { }
	
	onSelect(data: string): void {
		this.value = data;
	}
	ngOnInit(): void {
		this.getAllCurrency();
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
