import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registrationcomponent/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component/login.component';

@NgModule({
  declarations: [
    AppComponent, RegisterComponent, LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent,],
})
export class AppModule { }
