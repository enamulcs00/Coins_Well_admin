import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { AuthService } from './_services/auth.service';
import { CommonService } from './_services/common.service';
import { NotificationsService } from './_services/notifications.service';
import { ToastrModule } from 'ngx-toastr';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgOtpInputModule } from 'ng-otp-input';
import { DocumentsComponent } from './components/confirm-dialog/documents/documents.component';
import { FvComponent } from './components/confirm-dialog/fv/fv.component';
import { ReasonComponent } from './components/confirm-dialog/reason/reason.component';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { UserComponent } from './components/confirm-dialog/user/user.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { EmailModalComponent } from './components/confirm-dialog/email-modal/email-modal.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
	declarations: [
		AppComponent,
		ConfirmDialogComponent,
		DocumentsComponent,
		FvComponent,
		ReasonComponent,
		UserComponent,
		EmailModalComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MaterialModule,
		HttpClientModule,
		NgOtpInputModule,
		FormsModule,
		GooglePlaceModule,
		ToastrModule.forRoot(),
		ModalModule.forRoot(),
		ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
		ReactiveFormsModule,
		NgxSpinnerModule
	],
	providers: [
		{ provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
		{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
		CommonService,
		AuthService,
		NotificationsService,
	],
	entryComponents: [ConfirmDialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule { }
