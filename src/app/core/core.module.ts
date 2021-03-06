import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
	declarations: [HeaderComponent, FooterComponent, SidebarComponent],
	imports: [
		CommonModule,
		CoreRoutingModule,
		NgxDatatableModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule
	],
	exports: [
		SidebarComponent,
		HeaderComponent,
		NgxDatatableModule,
		MaterialModule,
		ReactiveFormsModule,
		FormsModule
	]
})
export class CoreModule { }
