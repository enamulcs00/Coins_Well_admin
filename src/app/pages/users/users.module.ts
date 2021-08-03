import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { components } from '.';
import { CoreModule } from 'src/app/core/core.module';
@NgModule({
	declarations: [
		...components
	],
	imports: [
		CommonModule,
		UsersRoutingModule,
		CoreModule
	]
})
export class UsersModule { }
