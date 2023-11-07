import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerlistComponent } from './customerlist/customerlist.component';

const routes: Routes = [
  {path: 'list', component:CustomerlistComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
