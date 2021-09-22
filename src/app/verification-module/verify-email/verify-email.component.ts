import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-verify-email',
	templateUrl: './verify-email.component.html',
	styleUrls: ['./verify-email.component.scss']
})
export class VerifyEmailComponent implements OnInit {
	message: string = '';
	status: boolean = false;
	otpvalue: any;
	otpForm: FormGroup;
	isLoading: boolean = false;
	constructor(private fb: FormBuilder, private service: CommonService, private _noti: NotificationsService, private _diloag: MatDialog) { }

	ngOnInit(): void {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		this.service.post(urls.sendEmailOtpVerify, {
			email: userInfo.email
		}).subscribe();
		this.otpForm = this.fb.group({
			otp: ['']
		})
	}

	onOtpChange(event) {
		this.otpvalue = event;
	}

	verifyOtp() {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		if (this.otpvalue) {
			let obj = {
				"otp": this.otpvalue,
				email: userInfo.email
			}
			this.service.post(urls.verifyEmailOtpVerify, obj).subscribe((res: any) => {
				if (res.code == 200) {
					this.status = true;
				} else {
					this._noti.show('Failed', res.message, "Verification");
				}
			})
		} else {
			this._noti.show('Failed', "Invalid Otp", "Verification");
		}
	}

	closeIt() {
		this._diloag.openDialogs[0].close(false);
	}

}
