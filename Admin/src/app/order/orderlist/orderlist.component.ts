import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  orderList: any = [];
  constructor(private http: HttpClient, private route: Router) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetOrders').subscribe(res => {
      this.orderList = res;
    });
  }

  UpdateOrder(id: number) {
    this.route.navigate(['/updateorder', id])
  }
}
