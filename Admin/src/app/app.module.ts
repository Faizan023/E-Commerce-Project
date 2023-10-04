import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registercomponent/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from './product/addproductcomponent/product.component';
import { ListproductComponent } from './product/listproduct/listproduct.component';
import { ProductModule } from './product/product.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, RegisterComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
