import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './registrationcomponent/registration.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login.component/login.component';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';
import { ProductComponent } from './product/product.component';
import { CartComponent } from './cart/cart.component';
import { FooterComponent } from './footer/footer.component';
import { OrderComponent } from './order/order.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ContactComponent } from './contact/contact.component';
import { ErrorComponent } from './error/error.component';

@NgModule({
  declarations: [
    AppComponent, RegisterComponent, LoginComponent, HomeComponent, HeaderComponent, ProfileComponent, ProductComponent, CartComponent, FooterComponent, OrderComponent, ContactComponent, ErrorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent,],
})
export class AppModule { }
