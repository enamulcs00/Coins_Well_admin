import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AddUserComponent } from './users/add-user/add-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

import { PagesComponent } from './pages.component';
import { WalkthroghComponent } from './walkthrogh/walkthrogh.component';
import { BankNameListComponent } from './bank-name-list/bank-name-list.component';
import { ManageUpdateComponent } from './manage-update/manage-update.component';
import { ManageNotificationComponent } from './manage-notification/manage-notification.component';
import { AddNotificationComponent } from './manage-notification/add-notification/add-notification.component';
import { ManageCustomerSupportComponent } from './manage-customer-support/manage-customer-support.component';
import { WalletAddressComponent } from './wallet-address/wallet-address.component';
import { RequestComponent } from './request/request.component';
import { AddBankComponent } from './bank-name-list/add-bank/add-bank.component';
import { EditBankComponent } from './bank-name-list/edit-bank/edit-bank.component';
import { AnalyticsComponent } from './analytics/analytics.component';
import { RateChangeComponent } from './rate-change/rate-change.component';
import { ReferAmountComponent } from './refer-amount/refer-amount.component';
import { ChatComponent } from './chat/chat.component';
import { PermissionGuard } from '../_gurads/permission.guard';
import { TwoFactorPageComponent } from './two-factor/two-factor.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/dashboard',	
		pathMatch: 'full',
	},
	{
		path: '',
		component: PagesComponent,
		children: [
			{
				path: 'dashboard',
				component: DashboardComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'dashboard',
					type : "view"
				}
			},
			{
				path: 'myprofile',
				component: MyProfileComponent
			},
			{
				path: 'changepassword',
				component: ChangePasswordComponent
			},
			{
				path: 'users',
				loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
				canActivate : [PermissionGuard],
				data: {
					permission : 'users',
					type : "view"
				}
			},
			{
				path: 'manage-admins',
				loadChildren: () => import('./manage-admins/manage-admins.module').then(m => m.ManageAdminsModule),
				canActivate : [PermissionGuard],
				data: {
					permission : 'manage_sub_admin',
					type : "view"
				}
			},
			{
				path: 'walkthrough',
				component: WalkthroghComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'walkthrough',
					type : "view"
				}
			},
			{
				path: 'banknamelist',
				component: BankNameListComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'banks',
					type : "view"
				}
			},
			{
				path: 'banknamelist/addbank',
				component: AddBankComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'banks',
					type : "add"
				}
			},
			{
				path: 'banknamelist/editbank',
				component: EditBankComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'banks',
					type : "add"
				}
			},
			{
				path: 'manage-update',
				component: ManageUpdateComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'manage_update',
					type : "view"
				}
			},
			{
				path: 'manage-notification',
				component: ManageNotificationComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'notification',
					type : "view"
				}
			},
			{
				path: 'manage-notification/add-notification',
				component: AddNotificationComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'notification',
					type : "add"
				}
			},
			{
				path: 'manage-customer-support',
				component: ManageCustomerSupportComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'customer_support',
					type : "view"
				}
			},
			{
				path: 'wallet-address',
				component: WalletAddressComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'wallet_address',
					type : "view"
				}
			},
			{
				path: 'request',
				component: RequestComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'request',
					type : "view"
				}
			},
			{
				path: 'analytics',
				component: AnalyticsComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'analytics',
					type : "view"
				}
			},
			{
				path: 'rate-change',
				component: RateChangeComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'rate_change',
					type : "view"
				}
			},
			{
				path: 'refer-amount',
				component: ReferAmountComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'refer_and_earn',
					type : "view"
				}
			},
			{
				path: 'chat',
				component: ChatComponent
			},
			{
				path : 'two-factor',
				component : TwoFactorPageComponent
			}
		]

	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule { }
