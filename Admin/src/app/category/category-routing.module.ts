import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListcategoryComponent } from './listcategory/listcategory.component';
import { AddcategoryComponent } from './addcategory/addcategory.component';
import { UpdatecategoryComponent } from './updatecategory/updatecategory.component';

const routes: Routes = [
  { path: '', component: ListcategoryComponent },
  { path: 'listcategory', component: ListcategoryComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'updatecategory/:id', component: UpdatecategoryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoryRoutingModule { }
