import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registercomponent/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AddbrandComponent } from './brand/addbrand/addbrand.component';
import { ListbrandComponent } from './brand/listbrand/listbrand.component';
import { UpdatebrandComponent } from './brand/updatebrand/updatebrand.component';
import { AddcategoryComponent } from './category/addcategory/addcategory.component';
import { UpdatecategoryComponent } from './category/updatecategory/updatecategory.component';
import { ListcategoryComponent } from './category/listcategory/listcategory.component';
import { AddsaleComponent } from './sale/addsale/addsale.component';
import { UpdatesaleComponent } from './sale/updatesale/updatesale.component';
import { ListsaleComponent } from './sale/listsale/listsale.component';
import { CustomerlistComponent } from './customer/customerlist/customerlist.component';
import { OrderlistComponent } from './order/orderlist/orderlist.component';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent, RegisterComponent,
    AddbrandComponent, ListbrandComponent,
    UpdatebrandComponent, AddcategoryComponent,
    UpdatecategoryComponent, ListcategoryComponent,
    AddsaleComponent, UpdatesaleComponent,
    ListsaleComponent, CustomerlistComponent,
    OrderlistComponent,NavbarComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    ToastrModule.forRoot(),

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
