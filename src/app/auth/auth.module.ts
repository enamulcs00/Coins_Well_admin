import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ForgetpasswordComponent } from './forgetpassword/forgetpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [LoginComponent, SignupComponent, ForgetpasswordComponent, ResetpasswordComponent],
	imports: [
		CommonModule,
		AuthRoutingModule,
		ReactiveFormsModule
	],
	providers : []
})
export class AuthModule { }
