import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './addproductcomponent/product.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: ProductComponent },
  { path: 'listproduct', component: ListproductComponent },
  {path:'updateproduct/:id', component:UpdateComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
