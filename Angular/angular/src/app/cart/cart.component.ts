import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../service/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  customer: any = []
  customerId: number = 0;
  cartItem: any = [];
  product: any = [];
  totalAmount: number = 0
  popOverMessage: string = "Confirm to remove from cart?";
  cancelClicked: boolean = false;
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();
  billingFormIsOpen: boolean = false;
  CartBillingForm!: FormGroup;
  orderTotal: number = 0
  // productId: number = 4;
  constructor(private http: HttpClient, private route: Router, private toast: NotificationService, private auth: AuthService, private form: FormBuilder) { }

  ngOnInit(): void {

    this.CartBillingForm = this.form.group({
      paymentMethod: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    });

    var getDetails = localStorage.getItem('token');
    if (getDetails) {
      this.customer = this.jwtHelperService.decodeToken(getDetails);
    }
    this.LoadCart();
    this.GetCartTotal();
  }

  LoadCart() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    this.http.get('http://localhost:5209/api/Controller/getcartbycustomer/' + this.customer.id, { headers }).subscribe(res => {
      this.cartItem = res;
    });
  }

  DeleteCart(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/RemoveCart/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toast.showSuccess("success", "You'r item has been removed")
        this.LoadCart();
        this.GetCartTotal();
      }
    });
  }

  GetProduct(id: number) {
    this.route.navigateByUrl('/product/' + id)
  }

  ConfirmOrder() {
    if (this.CartBillingForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      });
      var date = new Date();
      this.cartItem.forEach((res: any) => {
        console.log(res.id);
        var totalAmount = res.quantity * res.price - (res.quantity * res.price / 100 * res.discount)
        this.http.post('http://localhost:5209/api/Controller/AddOrder', {
          customerId: this.customer.id,
          quantity: res.quantity,
          amount: Math.round(totalAmount),
          productId: res.productId,
          paymentMethod: this.CartBillingForm.value.paymentMethod,
          orderDate: date,
          deliveryAddress: this.CartBillingForm.value.address + this.CartBillingForm.value.address2 + this.CartBillingForm.value.city + this.CartBillingForm.value.state + this.CartBillingForm.value.zip,
          billingAddress: 'Bapunagar',
          deliveryDate: date,
          deliveryCharge: this.product.deliveryCharge,
          status: "Not Delivered",
          createdDateTime: date,
          updatedDateTime: null,
          createdBy: this.customer.id,
          updatedBy: null,
          statusDateTime: null
        }, { responseType: 'text', headers }).subscribe((apires: any) => {
          console.log(apires);
        });
      });
    }
  }
  GetCartTotal() {
    this.http.get('http://localhost:5209/GetCount/' + this.customer.id).subscribe((res: any) => {
      this.orderTotal = Number(res['cartTotal']);
    });
  }
}
