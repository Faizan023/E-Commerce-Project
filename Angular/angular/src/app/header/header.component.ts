import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

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
  popOverMessage: string = "Confirm to logout?";
  cancleClicked: boolean = false;
  constructor(private http: HttpClient) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();

  ngOnChanges(changes: SimpleChanges): void {
    this.http.get('http://localhost:5209/GetCount/' + this.customerDetails.id).subscribe((res: any) => {
      this.cartCount = Number(res["cartCount"]);
      this.orderCount = Number(res["orderCount"]);
    });
  }

  ngOnInit(): void {

    var getItem = localStorage.getItem("token");
    if (getItem) {
      this.customerDetails = this.jwtHelperService.decodeToken(getItem);
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
