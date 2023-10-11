import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listsale',
  templateUrl: './listsale.component.html',
  styleUrls: ['./listsale.component.css']
})
export class ListsaleComponent implements OnInit {
  // SaleList: Array<{ id: number, name: string, startDate: Date, endDate: Date }> =[];
  SaleList: any = [];
  constructor(private http: HttpClient, private toastr: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetSales').subscribe(res => {
      this.SaleList = res;
    });
  }

  removesale(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteSale/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toastr.showWarning('Deleted', 'Successfully Deleted');
      }
    });
  }
  updatesale(id: number) {
    this.router.navigateByUrl('/sale/updatesale/' + id);
  }
}

