import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TooltipPosition } from '@ng-matero/extensions';
import { ColumnMode } from '@swimlane/ngx-datatable';
import { ToastrService } from 'ngx-toastr';
import { Block } from 'notiflix';
import { Subject } from 'rxjs';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { Page } from '../../modal/page';

@Component({
	selector: 'app-list',
	templateUrl: './list.component.html',
	styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
	positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  	position = new FormControl(this.positionOptions[1]);
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

	baseUrl: string = environment.homeURL;
	timeOut: number;
	constructor(private _common: CommonService, private toastr: ToastrService, private route: Router) {
		this.page.pageNumber = 0;
		this.page.size = 20;
	}

	ngOnInit() {
		this.setPage({ offset: 0 });
		this.searchData.event.subscribe(() => {
			this.setPage({
				offset: 0
			})
		})
	}

	

	navigate(id) {
			this.route.navigate(['manage-admins/add'], { queryParams: { id: id } });
	}
   
	searchHere() {
		clearTimeout(this.timeOut);
		this.timeOut = setTimeout(() => { this.searchData.event.next() }, 1000);
	}

	deleteUser(row) {
		const callAPI = () => {
			this._common.delete(`${urls.deleteSubAdmin}${row.id}/`).subscribe((res) => {
				if(res.code==200){
					this.toastr.success(res.message, "Success", { timeOut: 1050 });
				this.setPage({
					offset : this.page.pageNumber
				});
				}
				else
				{
					this.toastr.error(res.message,"Error");
				}
			});
		}
		this._common.confirm("Confirm", "Do you want to  Delete user ?").subscribe(res => {
			if (res) {
				callAPI();
			} else {
			}
		})
	}

	changeFlag(row) {
		let param={'is_active':row.is_active}
		this._common.put(`${urls.changeSubAdminStatus}${row.id}/`, param).subscribe((res) => {
			this.toastr.success(res.message, "Success", { timeOut: 1050 });
			this.setPage({ offset: 0 });
		});
	}

	documentModal(id) {
		const callAPI = () => {
			this._common.put(`${urls.acceptDoc}${id}/`,{}).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		const rCallAPI = (params:any) => {
			this._common.post(`${urls.rejectFvDocByUserId}`,params).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		this._common.dconfirm("Documents",id).subscribe(x => {
			if(x)
			{
				callAPI();

			}
			else if(x==false)
			{
				this._common.reasonConfirm("Reject Reason", "").subscribe((des: any) => {
					console.log(des);
					if (des) {
		               rCallAPI({
						"user":id,
						"rejection_type":"2",
						"description":des
					});				
					}
				});
			}
		})
	}

	fvModal(id) {
		const callAPI = () => {
			this._common.put(`${urls.acceptFv}${id}/`,{}).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		const rCallAPI = (params:any) => {
			this._common.post(`${urls.rejectFvDocByUserId}`,params).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		this._common.fvConfirm("Facial Verification",id).subscribe(x1 => {
			if(x1)
			{
				callAPI();

			}
			else if(x1==false)
			{
				this._common.reasonConfirm("Reject Reason", "").subscribe((des: any) => {
					console.log(des);
					if (des) {
		               rCallAPI({
						"user":id,
						"rejection_type":"1",
						"description":des
					});				
					}
				});
			}
		});
	}

	reasonModal() {
		this._common.reasonConfirm("Reject Reason", "").subscribe(x => {
		})
	}

	userModal(ig) {
		this._common.userConfirm("User Picture", ig).subscribe(x => {

		})
	}

	setPage(pageInfo) {
		Block.circle('#users-list-page');
		if (this.status != undefined) {
			this.formData.status = this.status;
		}
		if (this.status == null) {
			this.formData.status = this.status;
		}
		if (this.flag != undefined) {
			this.formData.flag = true;
		}
		this.formData.search.value = this.searchData.value;
		this.formData.start = pageInfo.offset * this.formData.length;
		this._common.post(urls.subAdminList, this.formData).subscribe(_pagedData => {
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
    
	userConfirm(row)
	{
		const callAPI = (x) => {
			this._common.put(`${urls.twofactorkey}${row.id}/`,{is_two_factor_authentication_enable:x}).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
				this.setPage({
					offset : this.page.pageNumber
				})
			});
		}
		this._common.confirm("Confirm", "Do you want to disable two factor authentication for this user ?").subscribe(res => {
			if (res) {
				callAPI(false);
			} else {
			}
		})
	}

	emailModal(row)
	{
		this._common.emailConfirm("Send Email","").subscribe(x=>{
			if(x){
			x['email']=row.email;
            this._common.post(urls.sendEmail,x).subscribe(res=>{
				if(res.code==200)
				{
					this.toastr.success(res.message,"Success",{timeOut:2000});
				}
				else
				{
					this.toastr.error(res.message,"Error",{timeOut:2000});
				}
			});
		}
		});
	}

}
