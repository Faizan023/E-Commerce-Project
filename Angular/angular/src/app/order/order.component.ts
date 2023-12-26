import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customerOrder: any = [];
  customer: any = [];
  constructor(private http: HttpClient, private toast: NotificationService) { }

  ngOnInit(): void {

    var getDetails = localStorage.getItem('details');
    if (getDetails) {
      this.customer = JSON.parse(getDetails);
    }
    this.GetOrders();
  }

  GetOrders() {
    this.http.get('http://localhost:5209/api/Controller/getOrderbyCustomer/' + this.customer.id).subscribe(res => {
      this.customerOrder = res;
    });
  }

  DeleteOrder(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteOrder/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toast.showSuccess("Deleted", "Success");
        this.GetOrders();
      } else {
        this.toast.showWarning("Error", "Something went wrong");
      }
    })
  }
}
