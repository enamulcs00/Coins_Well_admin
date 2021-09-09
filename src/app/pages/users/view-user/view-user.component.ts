import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-view-user',
	templateUrl: './view-user.component.html',
	styleUrls: ['./view-user.component.scss']
})
export class ViewUserComponent implements OnInit {
	localId: any;
	items: any;
	imageUrl: string;
	bItems: any;
	baseUrl: string = environment.homeURL;

	trasanctionitems: any;
	value: string = '2/5/';
	getUnreadCounts: any;

	constructor(private route: ActivatedRoute, private commn_: CommonService, private toastr: ToastrService) { }

	ngOnInit(): void {
		this.route.queryParams.subscribe(params => {
			this.localId = params.id;
		});
		this.getUserById();
		this.imageUrl = environment.imgBaseUrl;

		this.commn_.get(urls.getAllCurrency).subscribe(res => {
			this.trasanctionitems = res.data.filter(x => {
				if ([3, 4, 5].indexOf(x.id) == -1) {
					return true
				} else {
					return false;
				}
			});
		});

		this.commn_.onReadNotification.subscribe(data => {
			this.commn_.put(urls.getunReadRequest, { user_id : this.localId }).subscribe(data => {
				this.getUnreadCounts = data.data;
			});
		});
	}

	getSum(type: string = '') {
		let sum = 0;
		if (this.getUnreadCounts && typeof this.getUnreadCounts[type] != "undefined") {
			Object.values(this.getUnreadCounts[type]).forEach(value => {
				sum += Number(value);
			});
		}
		return sum;
	}

	onSelect(data: string): void {
		this.value = data;
		console.log("{ user_id : this.localId }",{ user_id : this.localId });
		this.commn_.put(urls.readunReadRequest + data, { user_id : this.localId }).subscribe(data => {
			this.commn_.onReadNotification.next('');
		});
	}

	userModal(ig) {
		this.commn_.userConfirm("User Picture", ig).subscribe(x => {

		})
	}

	documentModal(id) {
		const callAPI = () => {
			this.commn_.put(`${urls.acceptDoc}${id}/`, {}).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		const rCallAPI = (params: any) => {
			this.commn_.post(`${urls.rejectFvDocByUserId}`, params).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		this.commn_.dconfirm("Documents", id).subscribe(x => {
			console.log(x);
			if (x) {
				callAPI();

			}
			else if (x == false) {
				this.commn_.reasonConfirm("Reject Reason", "").subscribe((des: any) => {
					console.log(des);
					if (des) {
						rCallAPI({
							"user": id,
							"rejection_type": "1",
							"description": des
						});
					}
				});
			}
		})
	}

	fvModal(id) {
		const callAPI = () => {
			this.commn_.put(`${urls.acceptFv}${id}/`, {}).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		const rCallAPI = (params: any) => {
			this.commn_.post(`${urls.rejectFvDocByUserId}`, params).subscribe((res) => {
				this.toastr.success(res.message, "Success", { timeOut: 1050 });
			});
		}
		this.commn_.fvConfirm("Facial Verification", id).subscribe(x1 => {
			if (x1) {
				callAPI();

			}
			else if (x1 == false) {
				this.commn_.reasonConfirm("Reject Reason", "").subscribe((des: any) => {
					console.log(des);
					if (des) {
						rCallAPI({
							"user": id,
							"rejection_type": "2",
							"description": des
						});
					}
				});
			}
		});
	}

	getUserById() {
		this.commn_.get(urls.getUserById + this.localId + "/").subscribe(res => {
			console.log(res);
			this.items = res.data;
		});
		this.commn_.get(urls.getBalance + this.localId + "/").subscribe(res => {
			console.log(res);
			this.bItems = res.data;
		});
	}
}
