import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './addproductcomponent/product.component';
import { ListproductComponent } from './listproduct/listproduct.component';
import { UpdateComponent } from './update/update.component';

const routes: Routes = [
  { path: '', component: ListproductComponent },
  { path: 'list', component: ListproductComponent },
  { path: 'add', component: ProductComponent },
  { path: 'update/:id', component: UpdateComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
