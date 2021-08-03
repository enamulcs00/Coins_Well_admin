import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { NotificationsService } from 'src/app/_services/notifications.service';
import { validEmail } from 'src/app/_validators/validEmail';

@Component({
	selector: 'app-forgetpassword',
	templateUrl: './forgetpassword.component.html',
	styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
	forgotPassword: FormGroup;
	isLoading: boolean = false;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder, private _noti: NotificationsService) { }

	ngOnInit() {
		this.forgotPassword = this._fb.group({
			email: [null, [Validators.required, Validators.email, validEmail]]
		})
	}

	forgotNow() {
		if (this.forgotPassword.valid) {
			if (this.forgotPassword.controls.email.value) {
				this.forgotPassword.controls.email.setValue(this.forgotPassword.controls.email.value.trim());
			}
			this.isLoading = true;
			this._auth.forgot(this.forgotPassword.value).subscribe(res => {
				this.isLoading = false;
				this._auth.otpEmail = this.forgotPassword.controls.email.value
				this._noti.show('success', res.message,"Otp");
				this.router.navigate(['/auth/otpscreen']);
			}, _ => {
				this.isLoading = false;
			})
		} else {
			this.forgotPassword.markAllAsTouched();
		}
	}
}
