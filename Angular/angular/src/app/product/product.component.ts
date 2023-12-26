import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';

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
  constructor(private route: Router, private router: ActivatedRoute, private http: HttpClient, private form: FormBuilder, private toast: NotificationService) { }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      this.productId = +res['id'];
      console.log(this.productId);
    });
    this.http.get('http://localhost:5209/api/Controller/GetProductBy/' + this.productId).subscribe(res => {
      this.product = res;
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

    const getCustomerDetails = localStorage.getItem('details');
    if (getCustomerDetails) {
      this.customer = JSON.parse(getCustomerDetails);
    }
  }

  AddtoCart() {
    var date = new Date().getDate;
    this.http.post('http://localhost:5209/api/Controller/AddToCart', {
      customerId: this.customer.id,
      productId: this.productId,
      quantity: this.productPage.value.quantity,
      createDateTime: date,
      updateDateTime: null,
      createdBy: this.customer.id,
      updatedBy: null
    }, { responseType: 'text' }).subscribe(res => {
      if (res == "Addedd Successfully") {

        this.toast.showSuccess("Success", "Addedd Successfully");
      } else {
        this.toast.showError("Error", "Something went wrong");
      }
    });
  }

  ConfirmOrder() {
    if (this.BillingForm.valid) {
      // var newDate = new Date();
      var date = new Date().getUTCDate;
      // var addDate = newDate.setDate(7)
      this.http.post('http://localhost:5209/api/Controller/AddOrder', {
        customerId: this.customer.id,
        quantity: this.productPage.value.quantity,
        amount: this.product.price,
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
      },{responseType:'text'}).subscribe(res => {
        console.log(res);
      });
    }
  }
  
}
