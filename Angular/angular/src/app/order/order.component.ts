import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';
import { BehaviorSubject } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  customerOrder: any = [];
  customer: any = [];
  loading: boolean = true;
  popOverMeasage: string = "Confirm to delete";
  cancelClicked: boolean = false;
  constructor(private http: HttpClient, private toast: NotificationService) { }

  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();

  ngOnInit(): void {
    var getDetails = localStorage.getItem('token');
    if (getDetails) {
      this.customer = this.jwtHelperService.decodeToken(getDetails);
    }
    this.GetOrders();
  }

  GetOrders() {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
    });

    this.http.get('http://localhost:5209/api/Controller/getOrderbyCustomer/' + this.customer.id, { headers }).subscribe(res => {
      this.customerOrder = res;
      this.loading = false
    }, (error) => {
      console.error('Error fetching name', error);
      this.loading = false;
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
    });
  }
}
