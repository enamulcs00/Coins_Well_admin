import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequestTableComponent } from '../request-table/request-table.component';
import { CoreModule } from 'src/app/core/core.module';
import { MatDatepickerModule } from '@angular/material/datepicker';



@NgModule({
  declarations: [
    RequestTableComponent
  ],
  imports: [
    CommonModule, 
    CoreModule,
    MatDatepickerModule
  ],
  exports:[
    RequestTableComponent
  ]
})
export class RequestTableModule { }
