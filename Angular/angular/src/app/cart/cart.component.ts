import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

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
  productId: number = 4;
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
   
    var getDetails = localStorage.getItem('details');
    if (getDetails) {
      this.customer = JSON.parse(getDetails);
      this.customerId = this.customer.id;
    }
    this.LoadCart();

    this.http.get('http://localhost:5209/api/Controller/GetProductBy/' + this.productId).subscribe(res => {
      this.product = res;
    });
  }

  LoadCart() {
    this.http.get('http://localhost:5209/api/Controller/getcartbycustomer/' + this.customerId).subscribe(res => {
      this.cartItem = res;
    });
  }
  DeleteCart(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/RemoveCart/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        console.log("Deleted Successfully");
        this.LoadCart();
      }
    });
  }
}
