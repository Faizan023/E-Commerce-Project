import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnChanges {
  cartCount: number = 0;
  orderCount: number = 0;
  customerDetails: any = [];
  category: any;
  popOverMessage:string = "Confirm to logout?";
  cancleClicked:boolean = false;
  constructor(private http: HttpClient) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.http.get('http://localhost:5209/GetCount/' + this.customerDetails.id).subscribe((res: any) => {
      this.cartCount = Number(res["cartCount"]);
      this.orderCount = Number(res["orderCount"]);
    });
  }
  
  ngOnInit(): void {

    var getItem = localStorage.getItem("details");
    if (getItem) {
      this.customerDetails = JSON.parse(getItem);
    }

    this.http.get('http://localhost:5209/GetCount/' + this.customerDetails.id).subscribe((res: any) => {
      this.cartCount = Number(res["cartCount"]);
      this.orderCount = Number(res["orderCount"]);
    });
    this.http.get('http://localhost:5209/api/Controller/GetCategories').subscribe(res => {
      this.category = res;
    });

  }

  logout() {
    localStorage.removeItem('details');
    localStorage.removeItem('token');
  }
}
