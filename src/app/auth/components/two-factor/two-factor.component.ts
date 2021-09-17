import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/_services/auth.service';
import { CommonService } from 'src/app/_services/common.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { urls } from 'src/app/_services/urls';

@Component({
	selector: 'app-two-factor',
	templateUrl: './two-factor.component.html',
	styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {
	message: string = '';
	status: boolean = false;
	otpvalue: any;
	OtpForm: FormGroup;
	isLoading: boolean = false;
	constructor(private fb: FormBuilder, private service: CommonService, private _noti: NotificationsService, private router: Router,public bsModalRef: BsModalRef) { }

	ngOnInit(): void {
		this.OtpForm = this.fb.group({
			otp: ['']
		})
	}
	onOtpChange(event) {
		this.otpvalue = event
		console.log(this.otpvalue);
	}
	VerifyOtp() {
		if(this.otpvalue) {
			let obj = {
				"otp": this.otpvalue
			}
			this.service.postWithHeaders(urls.verifyOtp, obj, {
				Authorization : `Bearer ${this.message}`
			}).subscribe((res: any) => {
				if (res.code == 200) {
					this.status = true;
					this.bsModalRef.hide();
				} else {
					this._noti.show('Failed', res.message, "Verification");
				}
			})
		} else {
			this._noti.show('Failed', "Invalid Otp", "Verification");
		}
	}

}
