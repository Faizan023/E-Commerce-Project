import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private http: HttpClient, private toast: NotificationService) { }
  whishlistItem: any = [];
  customer: any = [];
  popOverMessage: string = "Confirm to remove from whishlist?";
  cancelClicked: boolean = false;
  loading: boolean = true;
  skeleton = new Array(10);
  JwtHelperService = new JwtHelperService();
  ngOnInit(): void {
    var getCustomer = localStorage.getItem('token');
    if (getCustomer) {
      this.customer = this.JwtHelperService.decodeToken(getCustomer);
    }
    this.LoadList();
  }

  LoadList() {
    this.http.get('http://localhost:5209/api/Controller/GetCustomerWishlist/' + this.customer.id).subscribe((res: any) => {
      this.whishlistItem = res;
      this.loading = false;
    }, (error) => {
      console.error('Error fetching name', error);
      this.loading = false
    });
  }
  Delete(Id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteWishlist/' + Id).subscribe((res: any) => {
      if ("Deleted Successfully") {
        this.toast.showSuccess("success", "item has been removed");
        this.LoadList();
      }
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
    }, { responseType: 'text', headers }).subscribe((res: any) => {
      if (res == "Addedd Successfully") {
        this.toast.showSuccess("Success", "Added to cart");
      } else {
        this.toast.showError("Error", "Something went wrong");
      }
    });
  }
}
