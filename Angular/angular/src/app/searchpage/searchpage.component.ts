import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  itemName: string = '';
  SearchProduct: any = [];
  customerId: number = 0
  JwtHelperService = new JwtHelperService();
  loading: boolean = true;
  skeleton = new Array(10);
  constructor(private router: ActivatedRoute, private http: HttpClient, private route: Router, private toast: NotificationService) { }

  ngOnInit(): void {
    this.router.params.subscribe(res => {
      // console.log(res['name']);
      this.itemName = res['name'];
      this.http.post('http://localhost:5209/api/Controller/SearchProduct', {
        categoryId: 0,
        itemName: this.itemName
      }).subscribe(res => {
        this.SearchProduct = res;
        this.loading = false
      });
    });
    var customer = localStorage.getItem('token');
    if (customer) {
      this.customerId = this.JwtHelperService.decodeToken(customer).id;
    }
    console.log(this.customerId);
  }

  GetProduct(id: number) {
    this.route.navigate(['/product/' + id])
  }

  AddtoWhishlist(productId: number) {
    var date = new Date();
    this.http.post('http://localhost:5209/api/Controller/InsertWishlist', {
      customerId: this.customerId,
      productId: productId,
      createDateTime: date,
      updateDateTime: date,
      createdBy: this.customerId,
      updatedBy: this.customerId
    }, { responseType: 'text' }).subscribe(res => {
      if (res == "Added Successfully") {
        this.toast.showSuccess("Success", "Added to whishlist");
      } else {
        this.toast.showError("Error", "Something went wrong");
      }
    });
  }
}
