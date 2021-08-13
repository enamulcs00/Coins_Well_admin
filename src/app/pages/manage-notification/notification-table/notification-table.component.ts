import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Page } from '../../modal/page';
import { Block } from 'notiflix';

@Component({
  selector: 'app-notification-table',
  templateUrl: './notification-table.component.html',
  styleUrls: ['./notification-table.component.scss']
})
export class NotificationTableComponent implements OnInit {
  searchText:any = '';
  delayTimer: number;
  constructor(private commn_:CommonService) { }

  ngOnInit(): void {
    this.setPage({offset:0});
  }
  
  changeText()
  {
    clearTimeout(this.delayTimer);
    this.delayTimer=setTimeout(()=>{
      this.setPage({offset:0});
    },2000);
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
  "columns": this.commn_.getColumns(this.definedColumns),
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

setPage(pageInfo) {
  Block.circle('#users-list-page');
  this.formData.search.value = this.searchText;
  this.formData.start = pageInfo.offset * this.formData.length;
  this.commn_.post(urls.getAllNotifiation, this.formData).subscribe(_pagedData => {
    console.log(_pagedData);
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
