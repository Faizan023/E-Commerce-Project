import { SaleModule } from './../../sale/sale.module';
import { Subscriber, filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-customerlist',
  templateUrl: './customerlist.component.html',
  styleUrls: ['./customerlist.component.css']
})
export class CustomerlistComponent implements OnInit {
  customerData !: FormGroup;
  constructor(private http: HttpClient, private route: Router, private form: FormBuilder, private toastr: NotificationService) { }
  customerList: any = [];
  p: number = 1;
  enteries: number = 10;
  popOverMsg: string = "Do you really want to delete?";
  cancelClicked: boolean = false;
  skeletonLoader = true;
  ngOnInit(): void {
    this.InitDetails();
    // this.customerData = this.form.group({
    //   select: [''],
    // });
    this.customerData = this.form.group({
      search: ['', Validators.required],
    });
  }

  remove(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteCustomer/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        // console.log("Customer Remove Successfully");
        this.toastr.showSuccess("Deleted Successfully", "Success");
        this.InitDetails();
      }
    });
  }

  Update(id: number) {
    this.route.navigateByUrl('/customer/update/' + id)
  }

  Search() {
    this.FindUser();
  }

  get FindUser() {
    let serachValue = this.customerData.controls['search'].value as string
    if (serachValue == "" || serachValue == null) {
      return this.customerList;
    } else {
      return this.customerList.filter((find: any) => {
        return (
          find.email.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.firstName.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.lastName.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.id.toString().includes(serachValue)
        );
      });
    }
  }

  InitDetails() {
    this.http.get('http://localhost:5209/api/Controller/GetCustomer').subscribe(res => {
      this.customerList = res;
      this.skeletonLoader = false;
    });
  }
}
