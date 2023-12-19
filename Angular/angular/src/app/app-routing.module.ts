import { LoginComponent } from './login.component/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './registrationcomponent/registration.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: '', component: LoginComponent, pathMatch: 'full' },
  { path: '**', component: LoginComponent, pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes),],
  exports: [RouterModule,],

})
export class AppRoutingModule { }
