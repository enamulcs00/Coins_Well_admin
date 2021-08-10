import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { components } from '.';
import { CoreModule } from 'src/app/core/core.module';
import { TableContentComponent } from './user-list/table-content/table-content.component';
@NgModule({
	declarations: [
		...components,
		TableContentComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		CoreModule,
		MaterialModule
	]
})
export class UsersModule { }
