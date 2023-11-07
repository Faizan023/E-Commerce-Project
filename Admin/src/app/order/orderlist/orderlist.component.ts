import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orderList: any = [];
  constructor(private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetOrders').subscribe(res => {
      this.orderList = res;
    });
  }

}
