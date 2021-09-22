import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { validEmail } from 'src/app/_validators/validEmail';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
// import { TwoFactorComponent } from '../../verification-module/two-factor/two-factor.component';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material/dialog';
import { VerifyPhoneComponent } from 'src/app/verification-module/verify-phone/verify-phone.component';
import { VerifyEmailComponent } from 'src/app/verification-module/verify-email/verify-email.component';
import { TwoFactorComponent } from 'src/app/verification-module/two-factor/two-factor.component';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isLoading: boolean = false;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder,private spinner: NgxSpinnerService, private _noti: NotificationsService, private dialog : MatDialog) { }

	ngOnInit() {
		this.loginForm = this._fb.group({
			email: [null, [Validators.required, Validators.email, validEmail]],
			password: [null, Validators.required],
			deviceType: ["WEB"]
		})
	}

	loginNow() {
		if (this.loginForm.controls.email.value) {
			this.loginForm.controls.email.setValue(this.loginForm.controls.email.value.trim());
		}
		if (this.loginForm.valid) {
			this.isLoading = true;
			this.spinner.show();
			let body=this.loginForm.value;
			body['token']=this._auth.firebaseToken;
			this._auth.login(body).subscribe(res => {
				this.spinner.hide();
				this.isLoading = false;
				if(res.data.is_two_factor_authentication_enable && res.data.is_two_factor_sms_authentication_enable) {
					const dialogRef = this.dialog.open(TwoFactorComponent, {
						disableClose: true,
						data : {
							token : res.data.token
						}
					});
					dialogRef.afterClosed().subscribe(result => {
						if (result) {
							const dialogRefSMS = this.dialog.open(VerifyPhoneComponent, {
								disableClose: true,
								data : {
									token : res.data.token
								}
							});
							dialogRefSMS.afterClosed().subscribe(result => {
								if (result) {
									const dialogRefEmail = this.dialog.open(VerifyEmailComponent, {
										disableClose: true,
										data : {
											token : res.data.token,
											email : res.data.email
										}
									});
									dialogRefEmail.afterClosed().subscribe(result => {
										if (result) {
											this.gotoDashboard(res);
										} else {
											this.gotoDashboard(res);
										}
									});
								} 
							});
						} 
					});
				} else if(res.data.is_two_factor_sms_authentication_enable) {
					const dialogRef = this.dialog.open(VerifyPhoneComponent, {
						disableClose: true,
						data : {
							token : res.data.token
						}
					});
					dialogRef.afterClosed().subscribe(result => {
						if (result) {
							const dialogRefEmail = this.dialog.open(VerifyEmailComponent, {
								disableClose: true,
								data : {
									token : res.data.token,
									email : res.data.email
								}
							});
							dialogRefEmail.afterClosed().subscribe(result => {
								if (result) {
									this.gotoDashboard(res);
								} else {
									this.gotoDashboard(res);
								}
							});
						} 
					});
				} else if(res.data.is_two_factor_authentication_enable) {
					const dialogRef = this.dialog.open(TwoFactorComponent, {
						disableClose: true,
						data : {
							token : res.data.token
						}
					});
					dialogRef.afterClosed().subscribe(result => {
						if (result) {
							this.gotoDashboard(res);
						} 
					});
				} else {
					this.gotoDashboard(res);
				}
			}, error => {
				this.isLoading = false;
				setTimeout(() => {
					this.spinner.hide();},2000);
			})
		} else {
			this.loginForm.markAllAsTouched();
		}
	}

	gotoDashboard(res) {
		localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
		this._noti.show('success', "Admin logged in successfully.", "Login!");
		this.router.navigate(['/dashboard']);
	}
}