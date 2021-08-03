import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/_services/auth.service';
import { CustomValidationService } from 'src/app/auth/custom-validation.service';
import { NotificationsService } from 'src/app/_services/notifications.service';


@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {
  newPassword: FormGroup;
	isLoading: boolean = false;
	constructor(public router: Router, private _auth: AuthService, private _fb: FormBuilder, private _noti: NotificationsService,private customvalidator:CustomValidationService) { }

	ngOnInit() {
		this.newPassword = this._fb.group({
			password: [null, [Validators.required,Validators.minLength(8)]],
      Cnfpassword:['']
		},{
      validator:this.customvalidator.passwordMatchValidator("password","Cnfpassword")
     })
	}

	forgotNow() {
    let url = `admin/update-password/`
    let obj = {
      "email":this._auth.otpEmail,
      "new_password":this.newPassword.controls.password.value
  }
		if (this.newPassword.valid) {
			if (this.newPassword.controls.password.value) {
				this.newPassword.controls.password.setValue(this.newPassword.controls.password.value.trim());
			}
  	this.isLoading = true;
			this._auth.postApi(url,obj).subscribe((res:any) => {
				this.isLoading = false;
				this._noti.show('success', res.message,"Otp");
				this.router.navigate(['/auth/login']);
			}, _ => {
				this.isLoading = false;
			})
		} else {
			this.newPassword.markAllAsTouched();
		}
	}
}
