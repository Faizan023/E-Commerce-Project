import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  recentselling: any = [];
  recentCustomer: any = [];
  customer: number = 0;
  orders: number = 0;
  revenue: number = 0;
  customerMonth: number = 0;
  customerYear: number = 0;
  orderMonth: number = 0;
  orderYear: number = 0;
  revenueMonth: number = 0;
  revenueYear: number = 0;
  // orderday:string ='Today';
  displayOrderText = "Today";
  displayOrderCount = 0;
  displayCustomerCount = 0;
  displayCustomerText = 'Today';
  displayRevenueCount = 0;
  displayRevenueText = 'Today';
  displayOrderListtext = 'Today';
  displayOrderListToday: any = [];
  // displayOrderListToday: any = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/DashboardCount').subscribe((res: any) => {
      this.customer = Number(res["customerCount"]);
      this.orders = Number(res["salesCount"]);
      this.revenue = Number(res["revenueCount"]);
      this.customerMonth = Number([res["customerCountMonth"]]);
      this.customerYear = Number(res["customerCountYear"]);
      this.orderMonth = Number(res["salesCountMonth"]);
      this.orderYear = Number(res["salesCountYear"]);
      this.revenueMonth = Number(res["revenueCountMonth"]);
      this.revenueYear = Number(res["revenueCountYear"]);
      console.log(res);
      this.FilterOrder('Today');
      this.FilterCustomer('Today');
      this.FilterRevenue('Today');
      this.FilterOrderList('Today');
    });
    this.http.get('http://localhost:5209/api/Controller/RecentCustomer').subscribe(res => {
      this.recentCustomer = res;
    });

  }

  FilterOrder(filter: string) {
    if (filter == "Today") {
      this.displayOrderCount = this.orders;
      this.displayOrderText = filter;
    } else if (filter == "This Year") {
      this.displayOrderCount = this.orderYear;
      this.displayOrderText = filter;
    } else if (filter == "This Month") {
      this.displayOrderCount = this.orderMonth;
      this.displayOrderText = filter;
    }
  }
  FilterCustomer(filter: string) {
    if (filter == "Today") {
      this.displayCustomerCount = this.customer;
      this.displayCustomerText = filter;
    } else if (filter == "This Month") {
      this.displayCustomerCount = this.customerMonth;
      this.displayCustomerText = filter;
    } else if (filter == "This Year") {
      this.displayCustomerCount = this.customerYear;
      this.displayCustomerText = filter;
    }
  }

  FilterRevenue(filter: string) {
    if (filter == "Today") {
      this.displayRevenueCount = this.revenue;
      this.displayRevenueText = filter;
    } else if (filter == "This Month") {
      this.displayRevenueCount = this.revenueMonth;
      this.displayRevenueText = filter;
    } else if (filter == "This Year") {
      this.displayRevenueCount = this.revenueYear;
      this.displayRevenueText = filter;
    }
  }

  FilterOrderList(filter: string) {
    if (filter == "Today") {
      this.http.get('http://localhost:5209/api/Controller/RecentSelling').subscribe(res => {
        this.displayOrderListToday = res;
      });
      this.displayOrderListtext = filter;
    } else if (filter == "This Month") {
      this.http.get('http://localhost:5209/api/Controller/MonthSelling').subscribe(res => {
        this.displayOrderListToday = res
      });
      this.displayOrderListtext = filter;
    } else if (filter == "This Year") {
      this.http.get('http://localhost:5209/api/Controller/YearSelling').subscribe(res => {
        this.displayOrderListToday = res;
      });
      this.displayOrderListtext = filter;
    }
  }

}