import { FormGroup, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
// import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, reduce } from 'rxjs';
import { NotificationService } from '../notification.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile!: FormGroup
  constructor(private form: FormBuilder, private http: HttpClient, private toast: NotificationService, private route: Router) { }
  details: any = [];
  joined: string = '';
  Id: any = [];
  // patchDetails: any = [];
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();
  ngOnInit(): void {
    this.profile = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      dateOfBirth: ['', Validators.required].toString(),
      address: ['', Validators.required]
    });

    const getCustomerDetails = localStorage.getItem('token');
    if (getCustomerDetails) {
      this.Id = this.jwtHelperService.decodeToken(getCustomerDetails);

      this.http.get("http://localhost:5209/api/Controller/GetCustomerBy/" + this.Id.id).subscribe(res => {
        this.details = res
        this.profile.patchValue({
          firstName: this.details.firstName,
          lastName: this.details.lastName,
          email: this.details.email,
          gender: this.details.gender,
          phoneNumber: this.details.phoneNumber,
          dateOfBirth: this.details.dateOfBirth,
          address: this.details.address,
        });
        this.joined = this.details.createdDateTime;
      })
      // console.log(this.details.id);

    }

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
