import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { reduce } from 'rxjs';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: FormGroup
  constructor(private form: FormBuilder, private customerService: CustomerService, private http: HttpClient, private toast: NotificationService, private route: Router) { }
  details: any = [];
  joined: string = '';
  // patchDetails: any = [];
  ngOnInit(): void {
    this.profile = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      address: ['', Validators.required]
    });

    const getCustomerDetails = localStorage.getItem('details');
    if (getCustomerDetails) {
      this.details = JSON.parse(getCustomerDetails);
      // console.log(this.details.id);
      this.profile.patchValue({
        firstName: this.details.firstName,
        lastName: this.details.lastName,
        email: this.details.email,
        gender: this.details.gender,
        phoneNumber: this.details.phoneNumber,
        dateOfBirth: this.details.dateOfBirth,
        address: this.details.address
      });
    }
    this.joined = this.details.createdDateTime;
  }

  SaveChanges() {
    if (this.profile.valid) {
      var date = new Date().getDate;
      this.http.put('http://localhost:5209/api/Controller/UpdateCustomer', {
        id: this.details.id,
        firstName: this.profile.value.firstName,
        lastName: this.profile.value.lastName,
        email: this.profile.value.email,
        password: this.details.password,
        gender: this.profile.value.gender,
        phoneNumber: this.profile.value.phoneNumber,
        dateOfBirth: this.profile.value.dateOfBirth,
        address: this.profile.value.address,
        createdDateTime: this.details.createdDateTime,
        createdBy: this.details.createdBy,
        updatedDateTime: date,
        updatedBy: this.details.id,
        active: this.details.active,
        activationDate: this.details.activationDate,
        activationKey: this.details.activationKey
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Updated Successfully") {
          this.toast.showSuccess("Success", "Updated Successfully");
        } else {
          this.toast.showError("Error", "Somrthing went wrong");
        }
      });
    }
  }
  GetProduct(id: number) {
    this.route.navigate(["/profile/" + id]);
  }
}
