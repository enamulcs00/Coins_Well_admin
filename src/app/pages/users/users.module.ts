import { MaterialModule } from './../../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { components } from '.';
import { CoreModule } from 'src/app/core/core.module';
import { TableContentComponent } from './user-list/table-content/table-content.component';
import { TransactionTableComponent } from './view-user/transaction-table/transaction-table.component';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
	declarations: [
		...components,
		TableContentComponent,
		TransactionTableComponent
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		CoreModule,
		MaterialModule,
		MatTooltipModule,
	]
})
export class UsersModule { }
