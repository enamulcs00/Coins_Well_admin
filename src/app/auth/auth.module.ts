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
import { TwoFactorComponent } from './components/two-factor/two-factor.component';

@NgModule({
	declarations: [LoginComponent, SignupComponent, ForgetpasswordComponent, ResetpasswordComponent, OtpComponent, SetpasswordComponent, TwoFactorComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule,
		NgOtpInputModule
	],
	entryComponents : [TwoFactorComponent],
	providers : []
})
export class AuthModule { }
