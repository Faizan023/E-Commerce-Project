import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './addproductcomponent/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ListproductComponent } from './listproduct/listproduct.component';



@NgModule({
  declarations: [
    ProductComponent,ListproductComponent
  ],
  imports: [
    CommonModule, ReactiveFormsModule, ProductRoutingModule
  ]
})
export class ProductModule { }
