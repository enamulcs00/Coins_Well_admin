import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { removeSpaces } from 'src/app/_validators/remove-spaces';
import { MustMatch } from 'src/app/_validators/must-match.validator';
import { CommonService } from 'src/app/_services/common.service';
import { urls } from 'src/app/_services/urls';
import { Router } from '@angular/router';
import { NotificationsService } from 'src/app/_services/notifications.service';

@Component({
	selector: 'app-change-password',
	templateUrl: './change-password.component.html',
	styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
	isLoading: boolean = false;
	setPasswordForm: FormGroup;

	constructor(private _common: CommonService, private _fb: FormBuilder, private _router: Router, private _noti: NotificationsService) { }

	ngOnInit(): void {
		this.setPasswordForm = this._fb.group({
			current_password: [null, Validators.required],
			new_password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(16), removeSpaces]],
			confirm_password: [null, Validators.required]
		}, { validators: MustMatch('new_password', 'confirm_password') });
	}

	setupPassword() {
		if (this.setPasswordForm.valid) {
			this.isLoading = true;
			const formData = Object.assign(this.setPasswordForm.value);
			delete formData.confirm_password;
			this._common.put(urls.changePassword, formData).subscribe(res => {
				this._noti.show("success", "Password changed successfully.", "Success!");
				this.setPasswordForm.reset();
				this._router.navigate(['/dashbaord']);
				this.isLoading = false;
			}, _ => {
				this.isLoading = false
			})
		} else {
			this.setPasswordForm.markAllAsTouched();
		}
	}


}
