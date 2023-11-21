import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerlistComponent } from './customerlist/customerlist.component';
import { UpdatecustomerComponent } from './updatecustomer/updatecustomer.component';
import { AuthGuardFunction } from '../guard/login-guard';
import { AddcustomerComponent } from './addcustomer/addcustomer.component';

const routes: Routes = [
  {
    path:'',
    component:CustomerlistComponent
  },
  {
    path: 'list',
    component: CustomerlistComponent
  },
  {
    path: 'update/:id',
    component: UpdatecustomerComponent,

  },
  {
    path: 'add',
    component: AddcustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
