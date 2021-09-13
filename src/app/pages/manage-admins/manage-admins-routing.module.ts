import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
				component: AddComponent
			},
			{
				path: 'edit/:adminId',
				component: AddComponent
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class ManageAdminsRoutingModule { }
