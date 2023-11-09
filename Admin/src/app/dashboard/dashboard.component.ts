import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recentselling: any = [];
  totalcustomer: any = [];
  customer: number = 0;
  orders: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/DashboardCount').subscribe((res: any) => {
      this.customer = Number(res["customerCount"]);
    });

    this.http.get('http://localhost:5209/api/Controller/OrderCount').subscribe((res: any) => {
      this.orders = Number(res["salesCount"]);
    });

    
  }

  // topselling(){
  //   this.http.get('http://localhost:5209/api/Controller/GetOrders').subscribe(res => {
  //   this.recentselling = res;
  //   });
  // }

}