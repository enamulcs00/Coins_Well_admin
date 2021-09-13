import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageAdminsRoutingModule } from './manage-admins-routing.module';
import { ManageAdminsComponent } from './manage-admins.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
	declarations: [
		ManageAdminsComponent,
		AddComponent,
		ListComponent
	],
	imports: [
		CommonModule,
		ManageAdminsRoutingModule,
		CoreModule,
		MatCheckboxModule
	]
})
export class ManageAdminsModule { }
