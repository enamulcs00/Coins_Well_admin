import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Block } from 'notiflix';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { Page } from '../modal/page';

@Component({
  selector: 'app-bank-name-list',
  templateUrl: './bank-name-list.component.html',
  styleUrls: ['./bank-name-list.component.scss']
})
export class BankNameListComponent implements OnInit {
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
			"data": "name"
		},
		{
			"data": "branch"
		},
		{
			"data": "ifsc"
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
	constructor(private _common: CommonService, private router: Router, private _noti: NotificationsService) {
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


	searchHere() {
		this.searchData.event.next()
	}
	setPage(pageInfo) {
		// Block.circle('#users-list-page');
		// if (this.status != undefined) {
		// 	this.formData.status = this.status;
		// }
		// if (this.flag != undefined) {
		// 	this.formData.flag = true;
		// }
		this.formData.search.value = this.searchData.value;
		this.formData.start = pageInfo.offset * this.formData.length;
		this._common.post(urls.getBankDetails, this.formData).subscribe(_pagedData => {
      console.log("Bank list",_pagedData);
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
  Delete(id) {
		this._noti.confirm("Delete!", "Do you want to delete ?").subscribe(x => {
      console.log("IsX",x);
      
			if (x) {
				this._common.deleteById(urls.deleteBank,id).subscribe((res:any)=>{
          console.log("Res dele",res);
          if(res.code==200){
            this._noti.show("success", "Bank deleted succesfully.", "Success!");
        }
        })
			
			}
		})
	}
}
