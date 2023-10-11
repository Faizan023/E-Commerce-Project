import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registercomponent/register.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'product', loadChildren: () => import('./product/product.module').then(m => m.ProductModule) },
  { path: 'brand', loadChildren: () => import('./brand/brand.module').then(b => b.BrandModule) },
  { path: 'category', loadChildren: () => import('./category/category.module').then(c => c.CategoryModule) },
  { path: 'sale', loadChildren: () => import('./sale/sale-routing.module').then(s => s.SaleRoutingModule) },
  { path: '', component: RegisterComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
