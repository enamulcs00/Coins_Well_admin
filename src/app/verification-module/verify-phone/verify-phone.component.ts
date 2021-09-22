import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
@Component({
	selector: 'app-verify-phone',
	templateUrl: './verify-phone.component.html',
	styleUrls: ['./verify-phone.component.scss']
})
export class VerifyPhoneComponent implements OnInit {
	message: string = '';
	status: boolean = false;
	otpvalue: any;
	otpForm: FormGroup;
	isLoading: boolean = false;
	constructor(private fb: FormBuilder, private service: CommonService, private _noti: NotificationsService, private _diloag: MatDialog, public dialogRef: MatDialogRef<VerifyPhoneComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any)  { }

	ngOnInit(): void {
		if(this.data) {
			this.service.postWithHeaders(urls.sendPhoneOtp, {}, {
				Authorization: `Bearer ${this.data.token}`
			}).subscribe();
		} else {
			this.service.post(urls.sendPhoneOtp).subscribe();
		}
		this.otpForm = this.fb.group({
			otp: ['']
		})
	}

	onOtpChange(event) {
		this.otpvalue = event;
	}

	verifyOtp() {
		if (this.otpvalue) {
			let obj = {
				"otp": this.otpvalue
			}
			if(this.data) {
				this.service.postWithHeaders(urls.verifyPhoneOtp, obj, {
					Authorization: `Bearer ${this.data.token}`
				}).subscribe((res: any) => {
					this._diloag.openDialogs[0].close(true);
				})
			} else {
				this.service.post(urls.verifyPhoneOtp, obj).subscribe((res: any) => {
					this._diloag.openDialogs[0].close(true);
				})
			}
		} else {
			this._noti.show('Failed', "Invalid Otp", "Verification");
		}
	}

	closeIt() {
		this._diloag.openDialogs[0].close(false);
	}
}
