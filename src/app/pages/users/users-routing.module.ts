import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddUserComponent } from './add-user/add-user.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UsersComponent } from './users.component';
import { ViewUserComponent } from './view-user/view-user.component';
const routes: Routes = [
	{
		path: '',
		component: UsersComponent,
		children: [
			{
				path: '',
				component: UserListComponent
			},
			{
				path: 'add',
				component: AddUserComponent
			},
			{
				path: 'edit',
				component: EditUserComponent
			},
			{
				path: 'view',
				component: ViewUserComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
