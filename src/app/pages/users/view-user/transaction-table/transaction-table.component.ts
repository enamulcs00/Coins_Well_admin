import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Block } from 'notiflix';
import { Page } from 'src/app/pages/modal/page';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-transaction-table',
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.scss']
})
export class TransactionTableComponent implements OnInit {
  @Input('id') id:any;
  imageUrl=environment.imgBaseUrl;
  page = new Page();
  searchText:any="";
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
		"draw": 2,
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
	timeset:any;
  constructor(private _common:CommonService) { }
  
  ngOnInit(): void {
    this.setPage({ offset: 0 });
    console.log(this.id);
  }
  
  changeSearch()
  {
   clearTimeout(this.timeset);
   this.timeset=setTimeout(()=>{
    this.setPage({ offset: 0 });
   },2000);
  }

  setPage(pageInfo) {
		Block.circle('#users-list-page');
		this.formData.search.value = this.searchText;
		this.formData.start = pageInfo.offset * this.formData.length;
		this._common.post(urls.getTransection+this.id+"/", this.formData).subscribe(_pagedData => {
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
