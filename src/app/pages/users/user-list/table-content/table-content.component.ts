import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Block } from 'notiflix';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { Page } from '../../../modal/page';

@Component({
	selector: 'user-list-table-content',
	templateUrl: './table-content.component.html',
	styleUrls: ['./table-content.component.scss']
})
export class TableContentComponent implements OnInit {
	@Input('status') status: boolean | null;
	@Input('flag') flag: boolean | null;
	@Input('searchData') searchData = {
		event: new Subject(),
		value: ''
	}
	page = new Page();
	rows = new Array<any>();
	ColumnMode = ColumnMode;
	definedColumns = [
		{
			"data": "id"
		},
		{
			"data": "first_name"
		},
		{
			"data": "last_name"
		},
		{
			"data": "email"
		}
	]
	formData: any = {
		"status": status,
		"draw": 0,
		"columns": this._common.getColumns(this.definedColumns),
		"order": [
			{
				"column": 0,
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
	
	baseUrl : string = environment.homeURL;
	constructor(private _common: CommonService) {
		this.page.pageNumber = 0;
		this.page.size = 20;
	}

	ngOnInit() {
		this.setPage({ offset: 0 });
		this.searchData.event.subscribe(searchText => {
			this.setPage({
				offset: 0
			})
		})
	}


	setPage(pageInfo) {
		Block.circle('#users-list-page');
		if (this.status != undefined) {
			this.formData.status = this.status;
		}
		if (this.flag != undefined) {
			this.formData.flag = true;
		}
		this.formData.search.value = this.searchData.value;
		this.formData.start = pageInfo.offset * this.formData.length;
		this._common.post(urls.getUsers, this.formData).subscribe(_pagedData => {
			this.page = {
				totalElements: _pagedData.recordsTotal,
				pageNumber: pageInfo.offset,
				totalPages: Math.ceil(_pagedData.recordsTotal / this.formData.length),
				size: this.formData.length
			}
			this.rows = _pagedData.data;
			setTimeout((x => {
				Block.remove('#users-list-page');
			}), 700);
		});
	}

}
