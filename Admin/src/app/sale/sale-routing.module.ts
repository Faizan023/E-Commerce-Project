import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListsaleComponent } from './listsale/listsale.component';
import { UpdatesaleComponent } from './updatesale/updatesale.component';
import { AddsaleComponent } from './addsale/addsale.component';

const routes: Routes = [
  { path: '', component: ListsaleComponent },
  { path: 'add', component: AddsaleComponent },
  { path: 'list', component: ListsaleComponent },
  { path: 'update/:id', component: UpdatesaleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }
