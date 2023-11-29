import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpResponse, HttpStatusCode } from '@angular/common/http';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-updateorder',
  templateUrl: './updateorder.component.html',
  styleUrls: ['./updateorder.component.css']
})
export class UpdateorderComponent implements OnInit {
  Id: number = 0;
  UpdateOrder !: FormGroup;
  OrderValue: any = [];
  constructor(private mid: ActivatedRoute, private updatedetails: FormBuilder, private http: HttpClient, private toastr: NotificationService, private route: Router) { }
  ngOnInit(): void {
    this.mid.params.subscribe(res => {
      this.Id = +res['id'];
      // console.log(this.Id);

      this.UpdateOrder = this.updatedetails.group({
        id: ['', Validators.required],
        customerId: ['',],
        quantity: ['',],
        amount: ['',],
        productId: ['',],
        PaymentMethod: ['',],
        orderDate: ['',],
        deliveryAddress: ['',],
        billingAddress: ['',],
        deliveryDate: ['',],
        deliveryCharge: ['',],
        status: ['',],
        createdDateTime: ['',],
        updatedDateTime: ['',],
        createdBy: ['',],
        updatedBy: ['',]
      });
      this.PatchValue();
      // console.log(this.OrderValue);
    });
  }

  PatchValue() {
    this.http.get<any>('http://localhost:5209/api/Controller/GetOrderBy/' + this.Id).subscribe(res => {
      this.OrderValue = res;
      // console.log(this.OrderValue);

      this.UpdateOrder.patchValue({
        // customerId: this.OrderValue.customerId,
        // quantity: this.OrderValue.quantity,
        // amount: this.OrderValue.amount,
        // productId: this.OrderValue.productId,
        // PaymentMethod: this.OrderValue.PaymentMethod,
        // orderDate: this.OrderValue.orderDate,
        // deliveryAddress: this.OrderValue.deliveryAddress,
        // billingAddress: this.OrderValue.billingAddress,
        // deliveryDate: this.OrderValue.deliveryDate,
        // deliveryCharge: this.OrderValue.deliveryCharge,
        status: this.OrderValue.status,
        // createdDateTime: this.OrderValue.createdDateTime,
        // updatedDateTime: this.OrderValue.updatedDateTime,
        // createdBy: this.OrderValue.createdBy,
        // updatedBy: this.OrderValue.updatedBy,
      });
    });
  }

  UpdateOrders() {
    var date = new Date();
    this.http.put('http://localhost:5209/api/Controller/UpdateOrder', {
      id: this.Id,
      customerId: this.OrderValue.customerId,
      quantity: this.OrderValue.quantity,
      amount: this.OrderValue.amount,
      productId: this.OrderValue.productId,
      paymentMethod: this.OrderValue.paymentMethod,
      orderDate: this.OrderValue.orderDate,
      deliveryAddress: this.OrderValue.deliveryAddress,
      billingAddress: this.OrderValue.billingAddress,
      deliveryDate: this.OrderValue.deliveryDate,
      deliveryCharge: this.OrderValue.deliveryCharge,
      status: this.UpdateOrder.value.status,
      createdDateTime: this.OrderValue.createdDateTime,
      updatedDateTime: date,
      createdBy: this.OrderValue.createdBy,
      updatedBy: 1,
      statusDateTime: date
    }, { responseType: 'text' }).subscribe((res) => {
      if (res == "Updated Successfully") {
        this.toastr.showSuccess("Updated Successfully", "Successs");
        this.route.navigateByUrl('order')
      } else {
        this.toastr.showError("Something went Wrong", "Error");
      }
    });
  }
}

