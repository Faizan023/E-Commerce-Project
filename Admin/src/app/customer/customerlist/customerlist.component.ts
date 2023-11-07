import { Subscriber } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  constructor(private http: HttpClient) { }
  customerList: any = [];
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetCustomer').subscribe(res => {
      this.customerList = res;
    });
  }

  remove(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteCustomer/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        console.log("Customer Remove Successfully");
      }
    });
  }
}
