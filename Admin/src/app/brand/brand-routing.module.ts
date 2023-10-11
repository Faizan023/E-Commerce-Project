import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListbrandComponent } from './listbrand/listbrand.component';
import { UpdatebrandComponent } from './updatebrand/updatebrand.component';
import { AddbrandComponent } from './addbrand/addbrand.component';

const routes: Routes = [
  { path: '', component: ListbrandComponent },
  { path: 'listbrand', component: ListbrandComponent },
  { path: 'addbrand', component: AddbrandComponent },
  { path: 'updatebrand/:id', component: UpdatebrandComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
