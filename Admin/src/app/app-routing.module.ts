import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registercomponent/register.component';
import { LoginComponent } from './login/login.component';
import { CustomerlistComponent } from './customer/customerlist/customerlist.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { AuthGuardFunction } from './guard/login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateorderComponent } from './order/updateorder/updateorder.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer-routing.module').then(m => m.CustomerRoutingModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'order',
    component: OrderlistComponent,
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'updateorder/:id',
    component: UpdateorderComponent,
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module').then(b => b.BrandModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(c => c.CategoryModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: 'sale',
    loadChildren: () => import('./sale/sale-routing.module').then(s => s.SaleRoutingModule),
    canActivate: [AuthGuardFunction]
  },
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
  },
  {
    path: '**',
    component: LoginComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
