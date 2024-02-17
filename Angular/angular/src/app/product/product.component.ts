import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  // quantity: number = 1;
  productPage!: FormGroup
  BillingForm!: FormGroup;
  productId: number = 0;
  product: any = [];
  customer: any = [];
  defaultValue: number = 1;
  billingFormIsOpen: boolean = false;
  similarProduct: any = [];
  constructor(private route: Router, private router: ActivatedRoute, private http: HttpClient, private form: FormBuilder, private toast: NotificationService) { }
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.productId = +res['id'];
    });
    this.http.get('http://localhost:5209/api/Controller/GetProductBy/' + this.productId).subscribe(res => {
      this.product = res;
      this.SimilarProduct();
    });

    this.productPage = this.form.group({
      quantity: ['', Validators.required]
    });

    this.BillingForm = this.form.group({
      paymentMethod: ['', Validators.required],
      address: ['', Validators.required],
      address2: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
    })

    const getCustomerDetails = localStorage.getItem('token');
    if (getCustomerDetails) {
      this.customer = this.jwtHelperService.decodeToken(getCustomerDetails);
    }
    // this.SimilarProduct()
  }

  AddtoCart() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });
    var date = new Date();
    this.http.post('http://localhost:5209/api/Controller/AddToCart', {
      customerId: this.customer.id,
      productId: this.productId,
      quantity: this.productPage.value.quantity,
      createDateTime: date,
      updateDateTime: null,
      createdBy: this.customer.id,
      updatedBy: null
    }, { responseType: 'text', headers }).subscribe(res => {
      if (res == "Addedd Successfully") {
        this.toast.showSuccess("Success", "Addedd Successfully");
      } else {
        this.toast.showError("Error", "Something went wrong");
      }
    });
  }

  ConfirmOrder() {
    if (this.BillingForm.valid) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
      });
      var totalAmount = this.product.price - this.product.price / 100 * this.product.discount
      // var newDate = new Date();
      var date = new Date();
      // var addDate = newDate.setDate(7)
      this.http.post('http://localhost:5209/api/Controller/AddOrder', {
        customerId: this.customer.id,
        quantity: this.productPage.value.quantity,
        amount: Math.trunc(totalAmount * this.productPage.value.quantity),
        productId: this.productId,
        paymentMethod: this.BillingForm.value.paymentMethod,
        orderDate: date,
        deliveryAddress: this.BillingForm.value.address + this.BillingForm.value.address2 + this.BillingForm.value.city + this.BillingForm.value.state + this.BillingForm.value.zip,
        billingAddress: 'Bapunagar',
        deliveryDate: date,
        deliveryCharge: 50,
        status: "Not Delivered",
        createdDateTime: date,
        updatedDateTime: null,
        createdBy: 1,
        updatedBy: null,
        statusDateTime: null
      }, { responseType: 'text', headers }).subscribe(res => {
        if (res == "Added Successfully") {
          this.toast.showSuccess("Success", "You'r order has been confirmed");
        } else {
          this.toast.showError("Error", "Something went wrong");
        }
      });
    }
  }
  SimilarProduct() {
    this.http.post('http://localhost:5209/api/Controller/SimilarProduct', {
      productName: this.product.name,
      categoryId: this.product.categoryId
    }).subscribe(res => { this.similarProduct = res });
  }
  getProduct(id: number) {
    this.route.navigateByUrl("/product/" + id);
  }
}
