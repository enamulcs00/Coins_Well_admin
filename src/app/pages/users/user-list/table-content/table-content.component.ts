import { Component, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Page } from '../../../modal/page';

@Component({
	selector: 'user-list-table-content',
	templateUrl: './table-content.component.html',
	styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {
	page = new Page();
	rows = new Array<any>();
	ColumnMode = ColumnMode;
	definedColumns = [
		{
			"data": "id"
		},
		{
			"data": "full_name"
		},
		{
			"data": "email"
		},
		{
			"data": "address"
		},
		{
			"data": "phone"
		},
		{
			"data": "user_documents",
			"name": "",
			"searchable": false,
			"orderable": false,
		},
		{
			"data": "account_number"
		},
		{
			"data": "bank_name"
		},
		{
			"data": "facial_verification"
		},
		{
			"data": "flag"
		},
		{
			"data": "status"
		},
		{
			"data": "account_status"
		}
	]
	formData: any = {
		"status": false,
		"draw": 0,
		"columns": this._common.getColumns(this.definedColumns),
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
	};

	constructor(private _common: CommonService) {
		this.page.pageNumber = 0;
		this.page.size = 20;
	}

	ngOnInit() {
		this.setPage({ offset: 0 });
	}


	setPage(pageInfo) {
		// this.page.pageNumber = pageInfo.offset;
		// this._common.post(urls.getUsers, this.formData).subscribe(_pagedData => {
		// 	// this.page = pagedData.page;
		// 	// this.rows = pagedData.data;
		// });
	}
}
