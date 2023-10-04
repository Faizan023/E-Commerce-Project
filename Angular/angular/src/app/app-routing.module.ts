import { LoginComponent } from './login.component/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registrationcomponent/registration.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: RegisterComponent, pathMatch: 'full' },
  { path: '**', component: RegisterComponent, pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule,],

})
export class AppRoutingModule { }
