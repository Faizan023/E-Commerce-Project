import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NotificationService } from '../notification.service';
import { tick } from '@angular/core/testing';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  fashion: any = [];
  mobileProduct: any = [];
  laptop: any = [];
  clothes: any = [];
  customer: any = [];
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();
  constructor(private http: HttpClient, private route: Router, private auth: AuthService, private toast: NotificationService) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetProduct',).subscribe((res: any) => {
      this.products = res;
      // window.location.reload();
    });
    this.FashionProduct();
    this.GetMobiles();
    this.GetLaptop();
    this.GetClothes();

    const getCustomerdetails = localStorage.getItem('token');
    if (getCustomerdetails) {
      this.customer = this.jwtHelperService.decodeToken(getCustomerdetails);
      console.log(this.jwtHelperService.decodeToken(getCustomerdetails))
    }
  }
  GetProduct(id: number) {
    this.route.navigate(["/product/" + id]);
    // console.log(id);
  }

  FashionProduct() {
    this.http.get('http://localhost:5209/api/Controller/GetFashionProduct').subscribe(res => {
      this.fashion = res;
    });
  }
  GetMobiles() {
    this.http.get('http://localhost:5209/api/Controller/GetMobiles').subscribe(res => {
      this.mobileProduct = res;
    });
  }
  GetLaptop() {
    this.http.get('http://localhost:5209/api/Controller/GetLaptop').subscribe(res => {
      this.laptop = res;
    });
  }
  GetClothes() {
    this.http.get('http://localhost:5209/api/Controller/GetClothes').subscribe(res => {
      this.clothes = res;
    });
  }

  AddtoCart(productId: number) {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    var date = new Date();
    this.http.post('http://localhost:5209/api/Controller/AddToCart', {
      customerId: this.customer.id,
      productId: productId,
      quantity: 1,
      createDateTime: date,
      updateDateTime: null,
      createdBy: this.customer.id,
      updatedBy: null
    }, { responseType: 'text', headers }).subscribe(res => {
      if (res == "Addedd Successfully") {
        this.toast.showSuccess("Success", "Added to cart");
      } else {
        this.toast.showError("Error", "Something went wrong");
      }
    });
  }
  AddtoWhishlist(productId: number) {
    var date = new Date();
    this.http.post('http://localhost:5209/api/Controller/InsertWishlist', {
      customerId: this.customer.id,
      productId: productId,
      createDateTime: date,
      updateDateTime: date,
      createdBy: this.customer.id,
      updatedBy: this.customer.id
    }, { responseType: 'text' }).subscribe(res => {
      if (res == "Added Successfully") {
        this.toast.showSuccess("Success", "Added to whishlist");
      } else {
        this.toast.showError("Error", "Something went wrong");
      }
    });
  }
}
