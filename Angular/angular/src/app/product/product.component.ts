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
  productId: number = 0;
  product: any = [];
  customer: any = [];
  defaultValue:number = 1;
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
    const getCustomerDetails = localStorage.getItem('details');
    if (getCustomerDetails) {
      this.customer = JSON.parse(getCustomerDetails);
    }
  }
  // IncreaseValue() {
  //   this.quantity++;
  //   console.log(this.quantity)
  // }

  AddtoCart() {
    var date = new Date().getDate;
    this.http.post('http://localhost:5209/api/Controller/AddToCart', {
      customerId: this.customer.id,
      productId: this.productId,
      quantity:this.productPage.value.quantity,
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
    console.log(this.customer.id);
  }
}
