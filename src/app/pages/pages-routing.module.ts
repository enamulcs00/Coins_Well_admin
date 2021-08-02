import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './user-list/add-user/add-user.component';
import { EditUserComponent } from './user-list/edit-user/edit-user.component';
import { ViewUserComponent } from './user-list/view-user/view-user.component';

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

const routes: Routes = [
  { 
    path: '', 
    component: PagesComponent,
    children : [
      { 
        path: 'dashboard', 
        component: DashboardComponent 
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
        path: 'user-list', 
        component: UserListComponent
      },
      { 
        path: 'user-list/add-user', 
        component: AddUserComponent
      },
      { 
        path: 'userlist/edit-user', 
        component: EditUserComponent
      },
      { 
        path: 'user-list/view-user', 
        component: ViewUserComponent
      },
      { 
        path: 'walkthrough', 
        component: WalkthroghComponent
      },
      { 
        path: 'banknamelist', 
        component: BankNameListComponent
      },
      { 
        path: 'banknamelist/addbank', 
        component: AddBankComponent
      },
      { 
        path: 'banknamelist/editbank', 
        component: EditBankComponent
      },
      { 
        path: 'manage-update', 
        component: ManageUpdateComponent
      },
      { 
        path: 'manage-notification', 
        component: ManageNotificationComponent
      },
      { 
        path: 'manage-notification/add-notification', 
        component: AddNotificationComponent
      },
      { 
        path: 'manage-customer-support', 
        component: ManageCustomerSupportComponent
      },
      { 
        path: 'wallet-address', 
        component: WalletAddressComponent
      },
      { 
        path: 'request', 
        component: RequestComponent
      },
      { 
        path: 'analytics', 
        component: AnalyticsComponent
      },
      { 
        path: 'rate-change', 
        component: RateChangeComponent
      },
      { 
        path: 'refer-amount', 
        component: ReferAmountComponent
      },
      { 
        path: 'chat', 
        component: ChatComponent
      },
    ]

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
