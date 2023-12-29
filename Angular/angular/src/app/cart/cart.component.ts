import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { NotificationService } from '../notification.service';

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
  popOverMessage: string = "Confirm to remove from cart?";
  cancelClicked: boolean = false;
  // productId: number = 4;
  constructor(private http: HttpClient, private route: Router, private toast: NotificationService) { }
  ngOnInit(): void {

    var getDetails = localStorage.getItem('details');
    if (getDetails) {
      this.customer = JSON.parse(getDetails);
    }
    this.LoadCart();
  }

  LoadCart() {
    this.http.get('http://localhost:5209/api/Controller/getcartbycustomer/' + this.customer.id).subscribe(res => {
      this.cartItem = res;
    });
  }

  DeleteCart(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/RemoveCart/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        console.log("Deleted Successfully");
        this.toast.showSuccess("success", "You'r item has been removed")
        this.LoadCart();
      }
    });
  }
  GetProduct(id: number) {
    this.route.navigateByUrl('/product/' + id)
  }
}
