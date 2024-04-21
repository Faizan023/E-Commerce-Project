import { Route, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-orderlist',
  templateUrl: './orderlist.component.html',
  styleUrls: ['./orderlist.component.css']
})
export class OrderlistComponent implements OnInit {
  ListOrder !: FormGroup;
  orderList: any = [];
  p: number = 1;
  itemsPerPage: number = 10;
  skeletonLoader: boolean = true;
  constructor(private http: HttpClient, private route: Router, private form: FormBuilder) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetOrders').subscribe(res => {
      this.orderList = res;
      this.skeletonLoader = false
    }, (error) => {
      console.error("Error FetchingName", error);
      this.skeletonLoader = false;
    });

    this.ListOrder = this.form.group({
      search: [''],
    });
  }

  UpdateOrder(id: number) {
    this.route.navigate(['/updateorder', id])
  }

  Search() {
    this.FindOrder;
  }

  get FindOrder() {
    let serachValue = this.ListOrder.controls['search'].value as string
    if (serachValue == "" || serachValue == null) {
      return this.orderList;
    } else {
      return this.orderList.filter((find: any) => {
        return (
          find.customerName.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.name.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.status.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.amount.toString().includes(serachValue) ||
          find.id.toString().includes(serachValue)
        );
      });
    }
  }
}
