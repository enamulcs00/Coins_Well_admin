import { Component, OnInit, ViewChild } from '@angular/core';
import { TabDirective, TabsetComponent } from 'ngx-bootstrap/tabs';
import { Subject } from 'rxjs';
import { timeout } from 'rxjs/operators';
import { CommonService } from 'src/app/_services/common.service';


@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	@ViewChild(TabsetComponent) tabset: TabsetComponent;
	searchData = {
		event: new Subject(),
		value: ''
	}
	value = 'Pending';
	timeOut: number;
	constructor(private _common: CommonService) {
	}

	ngOnInit() {
	}

	onSelect(data: TabDirective): void {
		console.log("data", data);
		this.value = data.heading;
	}

	searchHere() {
		clearTimeout(this.timeOut);
		this.timeOut=setTimeout(()=>{this.searchData.event.next()},1050);
	}

}
