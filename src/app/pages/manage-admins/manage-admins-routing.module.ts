import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PermissionGuard } from 'src/app/_gurads/permission.guard';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { ManageAdminsComponent } from './manage-admins.component';

const routes: Routes = [
	{
		path: '',
		component: ManageAdminsComponent,
		children: [
			{
				path: '',
				component: ListComponent
			},
			{
				path: 'add',
				component: AddComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'manage_sub_admin',
					type : "add"
				}
			},
			{
				path: 'edit',
				component: AddComponent,
				canActivate : [PermissionGuard],
				data: {
					permission : 'manage_sub_admin',
					type : "add"
				}
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ManageAdminsRoutingModule { }
