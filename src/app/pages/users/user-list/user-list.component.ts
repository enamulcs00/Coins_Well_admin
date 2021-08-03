import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/_services/common.service';
@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
		constructor(private _common: CommonService) {
	}

	ngOnInit() {
	
	}

}
