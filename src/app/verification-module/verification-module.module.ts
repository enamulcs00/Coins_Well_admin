import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { VerifyPhoneComponent } from './verify-phone/verify-phone.component';
import { CoreModule } from '../core/core.module';
import { NgOtpInputModule } from 'ng-otp-input';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TwoFactorComponent } from './two-factor/two-factor.component';

@NgModule({
	declarations: [
		VerifyEmailComponent,
		VerifyPhoneComponent,
		TwoFactorComponent
	],
	imports: [
		CommonModule,
		CoreModule,
		NgOtpInputModule,
		ModalModule
	],
	exports : [
		VerifyEmailComponent,
		VerifyPhoneComponent,
		TwoFactorComponent
	]
})
export class VerificationModuleModule { }
