import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registercomponent/register.component';
import { LoginComponent } from './login/login.component';
// import { CustomerlistComponent } from './customer/customerlist/customerlist.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
// import { AuthGuardFunction } from './guard/login-guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UpdateorderComponent } from './order/updateorder/updateorder.component';
import { tokenService } from './guard/login-guard';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [tokenService]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'customer',
    loadChildren: () => import('./customer/customer-routing.module').then(m => m.CustomerRoutingModule),
    canActivate: [tokenService]
  },
  {
    path: 'order',
    component: OrderlistComponent,
    canActivate: [tokenService]
  },
  {
    path: 'updateorder/:id',
    component: UpdateorderComponent,
    canActivate: [tokenService]
  },
  {
    path: 'product',
    loadChildren: () => import('./product/product.module').then(m => m.ProductModule),
    canActivate: [tokenService]
  },
  {
    path: 'brand',
    loadChildren: () => import('./brand/brand.module').then(b => b.BrandModule),
    canActivate: [tokenService]
  },
  {
    path: 'category',
    loadChildren: () => import('./category/category.module').then(c => c.CategoryModule),
    canActivate: [tokenService]
  },
  {
    path: 'sale',
    loadChildren: () => import('./sale/sale-routing.module').then(s => s.SaleRoutingModule),
    canActivate: [tokenService]
  },
  {
    path: '',
    redirectTo: '/login',
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
