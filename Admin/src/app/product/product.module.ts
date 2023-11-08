import { SidebarComponent } from './../sidebar/sidebar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './addproductcomponent/product.component';
import { ProductRoutingModule } from './product-routing.module';
import { ListproductComponent } from './listproduct/listproduct.component';
import { UpdateComponent } from './update/update.component';
import { NavbarComponent } from '../navbar/navbar.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule, ReactiveFormsModule, ProductRoutingModule,
  ]
})
export class ProductModule { }
