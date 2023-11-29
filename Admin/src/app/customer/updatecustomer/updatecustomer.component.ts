import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { first } from 'rxjs';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-updatecustomer',
  templateUrl: './updatecustomer.component.html',
  styleUrls: ['./updatecustomer.component.css']
})
export class UpdatecustomerComponent implements OnInit {
  UpdateDetail!: FormGroup;
  Id: number = 0;
  customerDetail: any = [];
  constructor(private mid: ActivatedRoute, private http: HttpClient, private form: FormBuilder, private toast: NotificationService, private route: Router) { }

  ngOnInit(): void {
    this.mid.params.subscribe(res => {
      this.Id = +res['id'];
    });

    this.UpdateDetail = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z0-9\d$@#$!%*?&].{8,15}')]],
      dateofbirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      gender: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(4)]],
    });
    this.PatchDetail();
  }

  PatchDetail() {
    this.http.get("http://localhost:5209/api/Controller/GetCustomerBy/" + this.Id).subscribe(res => {
      this.customerDetail = res;
      this.UpdateDetail.patchValue({
        firstName: this.customerDetail.firstName,
        lastName: this.customerDetail.lastName,
        email: this.customerDetail.email,
        password: this.customerDetail.password,
        phoneNumber: this.customerDetail.phoneNumber,
        dateofbirth: this.customerDetail.dateofbirth,
        gender: this.customerDetail.gender,
        address: this.customerDetail.address
      });
    });
  }

  UpdateForm() {
    var date = new Date();
    this.http.put("http://localhost:5209/api/Controller/UpdateCustomer", {
      id: this.Id,
      firstName: this.UpdateDetail.value.firstName,
      lastName: this.UpdateDetail.value.lastName,
      email: this.UpdateDetail.value.email,
      password: this.UpdateDetail.value.password,
      phoneNumber: this.UpdateDetail.value.phoneNumber,
      dateofbirth: this.UpdateDetail.value.dateofbirth,
      gender: this.UpdateDetail.value.gender,
      address: this.UpdateDetail.value.address,
      createdDateTime: this.customerDetail.createdDateTime,
      createdBy: 1,
      updatedDateTime: date,
      updatedBy: 1,
      active: true,
      activationDate: this.customerDetail.activationDate,
      activationKey: this.customerDetail.activationKey
    },{responseType:'text'}).subscribe(res => {
      if (res == "Updated Successfully") {
        this.toast.showSuccess("Updated Successfully", "Success");
        this.route.navigateByUrl('customer/list');
      }
    });
  }
}
