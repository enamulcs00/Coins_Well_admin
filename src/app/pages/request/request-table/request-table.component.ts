import { Component, Input, OnInit } from '@angular/core';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Page } from '../../modal/page';
import { Block } from 'notiflix';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { TabDirective } from 'ngx-bootstrap/tabs';
@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss']
})
export class RequestTableComponent implements OnInit {
  @Input('status') status: string | null;
	@Input('flag') flag: boolean | null;
	@Input('searchData') searchData = {
		event: new Subject(),
		value: ''
	}
	page = new Page();
	rows = new Array<any>();
	ColumnMode = ColumnMode;
  start_date: any="";
  end_date: any="";
  todayDate=new Date();


  constructor(private _common:CommonService,private toastr:ToastrService) { }



  ngOnInit(): void {
    this.setPage({ offset: 0 });
  }
   
  changeDateRange()
  {
    this.setPage({offset:0});
  }

  formData:any={
    "draw": 2,
    "start_date":this.start_date,
    "end_date":this.end_date,
    "columns": [
        {
            "data": "id",
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
            "column": 0,
            "dir": "undefined"
        }
    ],
    "start": 0,
    "length": 10,
    "search": {
        "value": "",
        "regex": false
    }
}

  setPage(pageInfo) {
		Block.circle('#users-list-page');
		this.formData.search.value = this.searchData.value;
		this.formData.start = pageInfo.offset * this.formData.length;
    this.formData.start_date=this.start_date;
    this.formData.end_date=this.end_date;
		this._common.post(urls.getAllPayment+this.status, this.formData).subscribe(_pagedData => {
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
  
  userModal(ig) {
		this._common.userConfirm("PAYMENT PROOF", environment.imgBaseUrl+ig).subscribe(x => {

		})
	}

  accept(id)
  {
    let body={"status":2}
    this._common.put(urls.requestAccept+id+'/',body).subscribe(res=>{
      console.log(res);
      if(res.code==200)
      {
        this.toastr.success(res.message,"Success",{timeOut:2000});
        this.setPage({offset:0});
      }
      else
      {
        this.toastr.error(res.message,"Error",{timeOut:2000});
      }
    })
  }
  
  reject(id)
  {
    this._common.reasonConfirm("Reject Reason","").subscribe(x=>{
    let body={"status":3,"reject_reason":x}
    if(x){
    this._common.put(urls.requestReject+id+'/',body).subscribe(res=>{
      console.log(res);
      if(res.code==200)
      {
        this.toastr.success(res.message,"Success",{timeOut:2000});
        this.setPage({offset:0});
      }
      else
      {
        this.toastr.error(res.message,"Error",{timeOut:2000});
      }
    });}
  });
  }

}
