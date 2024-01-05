import { LoginComponent } from './login.component/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registrationcomponent/registration.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { OrderComponent } from './order/order.component';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';
import {  tokenService } from './guard/login-guard.service';

const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate:[tokenService]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate:[tokenService]
  },
  {
    path: 'product/:id',
    component: ProductComponent,
    canActivate:[tokenService]
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate:[tokenService]
  },
  {
    path: 'order',
    component: OrderComponent,
    canActivate:[tokenService]
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate:[tokenService]
  },
  {
    path: 'error',
    component: ErrorComponent,
    canActivate:[tokenService]
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
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule,],

})
export class AppRoutingModule { }
