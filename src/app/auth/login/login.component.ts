import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { validEmail } from 'src/app/_validators/validEmail';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
	loginForm: FormGroup;
	isLoading: boolean = false;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder, private _noti: NotificationsService) { }

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
			let body=this.loginForm.value;
			body['token']=this._auth.firebaseToken;
			this._auth.login(body).subscribe(res => {
				this.isLoading = false;
				this._noti.show('success', "Admin logged in successfully.", "Login!");
				this.router.navigate(['/dashboard']);
			}, error => {
				this.isLoading = false;
			})
		} else {
			this.loginForm.markAllAsTouched();
		}
	}
}
