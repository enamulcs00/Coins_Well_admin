import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { SetpasswordComponent } from './setpassword/setpassword.component';


@NgModule({
	declarations: [LoginComponent, SignupComponent, ForgetpasswordComponent, ResetpasswordComponent, OtpComponent, SetpasswordComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		NgOtpInputModule
	],
	providers : []
})
export class AuthModule { }
