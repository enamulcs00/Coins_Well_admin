import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
	// otpvalue: any;
	otpForm: FormGroup;
	isLoading: boolean = false;
	userInfo;
	constructor(private fb: FormBuilder, private service: CommonService, private _noti: NotificationsService, private _diloag: MatDialog, public dialogRef: MatDialogRef<VerifyEmailComponent>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
		this.userInfo = this.data.userinfo;
	}

	ngOnInit(): void {
		this.otpForm = this.fb.group({
			email_otp: [],
			phone_otp: [],
			auth_otp: []
		});
		if (this.userInfo.is_two_factor_sms_authentication_enable) {
			this.otpForm.get('email_otp').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);
			this.otpForm.get('phone_otp').setValidators([Validators.required, Validators.minLength(4), Validators.maxLength(4)]);

			this.service.postWithHeaders(urls.sendEmailOtpVerify, {
				email: this.userInfo.email
			}, {
				Authorization: `Bearer ${this.userInfo.token}`
			}).subscribe();
			this.service.postWithHeaders(urls.sendPhoneOtp, {}, {
				Authorization: `Bearer ${this.userInfo.token}`
			}).subscribe();
		}
		if (this.userInfo.is_two_factor_authentication_enable) {
			this.otpForm.get('auth_otp').setValidators([Validators.required, Validators.minLength(6), Validators.maxLength(6)]);
		}
	}

	returnEmail(input: string) {
		var a = input.split("@");
		var b = a[0];
		var newstr = "";
		for (let i = 0; i < b.length; i++) {
			if (i > 0 && i < b.length - 1) newstr += "*";
			else newstr += b[i];
		}
		return newstr + "@" + a[1];
	}

	returnMobile(input: string) {
		return input.replace(/^(\+?\d{3})(\d+)(\d{2})$/, function () {
			return arguments[1] + arguments[2].replace(/./g, '*') + arguments[3];
		});
	}

	onOtpChange(event) {
		// this.otpvalue = event;
	}

	verifyOtp() {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));

		if (this.otpForm.valid) {
			if (this.userInfo.is_two_factor_sms_authentication_enable && this.userInfo.is_two_factor_authentication_enable) {
				let obj = {
					"otp": this.otpForm.get('email_otp').value,
					email: this.data.email
				}
				this.service.postWithHeaders(urls.verifyEmailOtpVerify, obj,
					{
						Authorization: `Bearer ${this.userInfo.token}`
					}).subscribe((res: any) => {
						let obj = {
							"otp": this.otpForm.get('phone_otp').value
						}
						this.service.postWithHeaders(urls.verifyPhoneOtp, obj, {
							Authorization: `Bearer ${this.userInfo.token}`
						}).subscribe((res: any) => {
							this.service.postWithHeaders(urls.verifyOtp, {
								"otp": this.otpForm.get('auth_otp').value
							}, {
								Authorization: `Bearer ${this.userInfo.token}`
							}).subscribe((res: any) => {
								if (res.code == 200) {
									this.status = true;
									this._diloag.openDialogs[0].close(true);
								} else {
									this._noti.show('Failed', "Invalid Auth OTP.", "Verification");
								}
							}, () => {
								this._noti.show('Failed', "Invalid Auth OTP.", "Verification");
							})
						}, () => {
							this._noti.show('Failed', "Invalid Phone OTP.", "Verification");
						})
					}, () => {
						this._noti.show('Failed', "Invalid Email OTP.", "Verification");
					})
			} else if (this.userInfo.is_two_factor_sms_authentication_enable) {
				let obj = {
					"otp": this.otpForm.get('email_otp').value,
					email: this.data.email
				}
				this.service.postWithHeaders(urls.verifyEmailOtpVerify, obj,
					{
						Authorization: `Bearer ${this.userInfo.token}`
					}).subscribe((res: any) => {
						let obj = {
							"otp": this.otpForm.get('phone_otp').value
						}
						this.service.postWithHeaders(urls.verifyPhoneOtp, obj, {
							Authorization: `Bearer ${this.userInfo.token}`
						}).subscribe((res: any) => {
							this._diloag.openDialogs[0].close(true);
						}, () => {
							this._noti.show('Failed', "Invalid Phone OTP.", "Verification");
						})
					}, () => {
						this._noti.show('Failed', "Invalid Email OTP.", "Verification");
					})
			} else if (this.userInfo.is_two_factor_authentication_enable) {
				this.service.postWithHeaders(urls.verifyOtp, {
					"otp": this.otpForm.get('auth_otp').value
				}, {
					Authorization: `Bearer ${this.userInfo.token}`
				}).subscribe((res: any) => {
					if (res.code == 200) {
						this.status = true;
						this._diloag.openDialogs[0].close(true);
					} else {
						this._noti.show('Failed', "Invalid Auth OTP.", "Verification");
					}
				}, () => {
					this._noti.show('Failed', "Invalid Auth OTP.", "Verification");
				})
			}
		}



		// if (this.otpvalue) {
		// 	if(this.data) {
		// let obj = {
		// 	"otp": this.otpvalue,
		// 	email: this.data.email
		// }
		// this.service.postWithHeaders(urls.verifyEmailOtpVerify, obj, 
		// 	{
		// 		Authorization: `Bearer ${this.userInfo.token}`
		// 	}).subscribe((res: any) => {
		// 	if (res.code == 200) {
		// 		this.status = true;
		// 	} else {
		// 		this._noti.show('Failed', res.message, "Verification");
		// 	}
		// })
		// 	} else {
		// 		let obj = {
		// 			"otp": this.otpvalue,
		// 			email: userInfo.email
		// 		}
		// 		this.service.post(urls.verifyEmailOtpVerify, obj).subscribe((res: any) => {
		// 			if (res.code == 200) {
		// 				this.status = true;
		// 			} else {
		// 				this._noti.show('Failed', res.message, "Verification");
		// 			}
		// 		})
		// 	}
		// } else {
		// 	this._noti.show('Failed', "Invalid Otp", "Verification");
		// }
	}

	closeIt() {
		this._diloag.openDialogs[0].close(false);
	}

}
