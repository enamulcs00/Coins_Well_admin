import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/_gurads/permission.guard';
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
				component: AddUserComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'users',
					type : "add"
				}
			},
			{
				path: 'edit',
				component: EditUserComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'users',
					type : "add"
				}
			},
			{
				path: 'view',
				component: ViewUserComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'users',
					type : "view"
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class UsersRoutingModule { }
