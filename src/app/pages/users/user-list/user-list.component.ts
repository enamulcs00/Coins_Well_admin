import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Page } from '../../modal/page';
@Component({
	selector: 'app-user-list',
	templateUrl: './user-list.component.html',
	styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
	page = new Page();
	rows = new Array<any>();
	ColumnMode = ColumnMode;
	constructor(private _common: CommonService) {
		this.page.pageNumber = 0;
		this.page.size = 20;
	}

	ngOnInit() {
		this.setPage({ offset: 0 });
	}


	setPage(pageInfo) {
		this.page.pageNumber = pageInfo.offset;
		this._common.post(urls.getUsers, {
			"status": false,
			"draw": 0,
			"columns": [
				{
					"data": "first_name",
					"name": "",
					"searchable": true,
					"orderable": true,
					"search": {
						"value": "",
						"regex": false
					}
				},
				{
					"data": "phone_number",
					"name": "",
					"searchable": true,
					"orderable": true,
					"search": {
						"value": "",
						"regex": false
					}
				},
				{
					"data": "email",
					"name": "",
					"searchable": true,
					"orderable": true,
					"search": {
						"value": "",
						"regex": false
					}
				}
			],
			"order": [
				{
					"column": 2,
					"dir": "desc"
				}
			],
			"start": 0,
			"length": 10,
			"search": {
				"value": "",
				"regex": false
			}
		}).subscribe(pagedData => {
			// this.page = pagedData.page;
			// this.rows = pagedData.data;
		});
	}
}
