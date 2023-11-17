import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';


@NgModule({
  declarations: [
    UpdatecustomerComponent
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class RoutingModule { }
