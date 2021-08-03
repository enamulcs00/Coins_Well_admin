import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CoreModule } from '../core/core.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { WalkthroghComponent } from './walkthrogh/walkthrogh.component';
import { BankNameListComponent } from './bank-name-list/bank-name-list.component';
import { AddBankComponent } from './bank-name-list/add-bank/add-bank.component';
import { ManageUpdateComponent } from './manage-update/manage-update.component';
import { ManageNotificationComponent } from './manage-notification/manage-notification.component';
import { ManageCustomerSupportComponent } from './manage-customer-support/manage-customer-support.component';
import { WalletAddressComponent } from './wallet-address/wallet-address.component';
import { RequestComponent } from './request/request.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RateChangeComponent } from './rate-change/rate-change.component';
import { ReferAmountComponent } from './refer-amount/refer-amount.component';
import { EditBankComponent } from './bank-name-list/edit-bank/edit-bank.component';
import { AddNotificationComponent } from './manage-notification/add-notification/add-notification.component';
import { ChatComponent } from './chat/chat.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [
		PagesComponent, 
		DashboardComponent, 
		MyProfileComponent, 
		ChangePasswordComponent, 
		WalkthroghComponent, 
		BankNameListComponent, 
		AddBankComponent, 
		ManageUpdateComponent, 
		ManageNotificationComponent, 
		ManageCustomerSupportComponent, 
		WalletAddressComponent, 
		RequestComponent, 
		AnalyticsComponent, 
		RateChangeComponent,
		ReferAmountComponent, 
		EditBankComponent, 
		AddNotificationComponent, 
		ChatComponent
	],
	imports: [
		CommonModule,
		PagesRoutingModule,
		CoreModule
	]
})
export class PagesModule { }
