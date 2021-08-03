import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
	declarations: [HeaderComponent, FooterComponent, SidebarComponent],
	imports: [
		CommonModule,
		CoreRoutingModule,
		NgxDatatableModule
	],
	exports: [
		SidebarComponent,
		HeaderComponent,
		NgxDatatableModule
	]
})
export class CoreModule { }
