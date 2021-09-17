import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { validEmail } from 'src/app/_validators/validEmail';
import { NgxSpinnerService } from "ngx-spinner";
import { Observable } from 'rxjs';
import { BsModalService } from 'ngx-bootstrap/modal';
import { TwoFactorComponent } from '../components/two-factor/two-factor.component';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isLoading: boolean = false;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder,private spinner: NgxSpinnerService, private _noti: NotificationsService, private modalService : BsModalService) { }

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
				if(res.data.permissions.length > 0 && res.data.authy_user_id) {
					this.askForTwoFactor(res.data.token).subscribe(()=>{
						localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
						this._noti.show('success', "Admin logged in successfully.", "Login!");
						this.router.navigate(['/dashboard']);
					})
				} else {
					this.isLoading = false;
					localStorage.setItem(environment.storageKey, JSON.stringify(res.data));
					setTimeout(() => {
					this.spinner.hide();},2000);
					this._noti.show('success', "Admin logged in successfully.", "Login!");
					this.router.navigate(['/dashboard']);
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

	askForTwoFactor(token) {
		return new Observable((resolve) => {
			let bsModalRef = this.modalService.show(TwoFactorComponent, {
				initialState: {
					message: token
				}
			});
			bsModalRef.onHidden.subscribe(x => {
				resolve.next(bsModalRef.content.status);
			});
		});
	}
}


// TwoFactorComponent