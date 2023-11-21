import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class RoutingModule { }
