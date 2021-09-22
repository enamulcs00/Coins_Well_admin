import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { VerifyEmailComponent } from 'src/app/verification-module/verify-email/verify-email.component';
import { VerifyPhoneComponent } from '../../verification-module/verify-phone/verify-phone.component';
import { Loading, Notify } from 'notiflix';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { environment } from 'src/environments/environment';
import { TwoFactorComponent } from 'src/app/verification-module/two-factor/two-factor.component';
declare var QRCode: any;



@Component({
	selector: 'app-two-factor-page',
	templateUrl: './two-factor.component.html',
	styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorPageComponent implements OnInit {
	deposit: boolean = false;
	withdraw: boolean = false;
	enable2FA: boolean = false;
	enabledQRCode : boolean = false;
	keySign : string = '';
	qrCodeSign : string = '';

	enableSMS2FA : boolean = false;
	
	constructor(private _common: CommonService, private dialog: MatDialog) { }

	ngOnInit(): void {
		let userInfo = JSON.parse(localStorage.getItem(environment.storageKey));
		if (userInfo) {
			this.enable2FA = userInfo.is_two_factor_authentication_enable;
			if(typeof userInfo.is_two_factor_sms_authentication_enable != "undefined") {
				this.enableSMS2FA = userInfo.is_two_factor_sms_authentication_enable;
			}
		}
	}

	enableTwoFactor() {
		Loading.circle();
		this.enabledQRCode = true;
		this.genCode();
	}

	ngAfterViewInit() {
		if (this.enable2FA) {
			Loading.circle();
			this.genCode();
		}
	}

	genCode(code : string = '') {
		this.enable2FA = !this.enable2FA;
		setTimeout(() => {
			this.enable2FA = !this.enable2FA
			if(!code) {
				this._common.get(urls.getQRCode).subscribe(data => {
					Loading.remove();
					this.qrCodeSign = data.data.qr_code;
					this.keySign =  data.data.auth_code
					new QRCode(document.getElementById("barcode"), {
						text: this.qrCodeSign,
						width: 150,
						height: 150,
						colorDark: "#000000",
						colorLight: "#ffffff",
						correctLevel: QRCode.CorrectLevel.H
					});
				})
			} else {
				new QRCode(document.getElementById("barcode"), {
					text: this.qrCodeSign,
					width: 150,
					height: 150,
					colorDark: "#000000",
					colorLight: "#ffffff",
					correctLevel: QRCode.CorrectLevel.H
				});
			}
		}, 200);
	}

	verify2fa() {
		const dialogRef2 = this.dialog.open(TwoFactorComponent, {
			disableClose: true
		});
		dialogRef2.afterClosed().subscribe(result => {
			if (result) {
				Loading.circle();
				this._common.post(urls.twoAuthSend, {
					'two_factor_authentication_status': this.enable2FA
				}).subscribe(() => {
					Loading.remove();
					if(this.enable2FA) {
						this.enabledQRCode = false;
						Notify.success("Your 2FA has been successfully Enabled.");
					} else {
						Notify.success("Your 2FA has been successfully Dsiabled.");

					}
				}, () => {
					Loading.remove();
				});
			} else {
				this.enable2FA = !this.enable2FA;
			}
		});
	}
	
	checkCode(val: boolean) {
		if(this.enable2FA) {
			this.enableTwoFactor();
		} else {
			this.verify2fa();
		}	
	}

	checkCodeSMSCode(val: boolean) {
		const dialogRef = this.dialog.open(VerifyPhoneComponent, {
			disableClose: true
		});
		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this._common.post(urls.changeSMSstatus,{
					is_two_factor_sms_authentication_enable : this.enableSMS2FA
				}).subscribe(data=>{
					if(this.enableSMS2FA) {
						Notify.success("Your 2FA sms has been successfully enabled.");
					} else {
						Notify.success("Your 2FA sms has been successfully disabled.");
					}
				})
			} else {
				this.enableSMS2FA = !this.enableSMS2FA
			}
		});
	}

}
