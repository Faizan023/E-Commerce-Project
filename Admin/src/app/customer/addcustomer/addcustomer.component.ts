import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthService } from 'src/app/service/service.service';

@Component({
  selector: 'app-addcustomer',
  templateUrl: './addcustomer.component.html',
  styleUrls: ['./addcustomer.component.css']
})
export class AddcustomerComponent {
  registration!: FormGroup
  displaymsg: string = '';
  // addbrandform: any;
  constructor(private user: FormBuilder, private http: HttpClient, private auth: AuthService, private toast: NotificationService, private route: Router) { }
  ngOnInit(): void {
    this.registration = this.user.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern("[0-9]{10}")]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z0-9\d$@#$!%*?&].{8,15}')]],
      dateofbirth: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      gender: ['', Validators.required],
      address: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  Register() {
    var date = new Date();
    if (this.registration.valid) {
      this.http.post("http://localhost:5209/api/Controller/InsertCustomer", {
        firstName: this.registration.value.firstName,
        lastName: this.registration.value.lastName,
        email: this.registration.value.email,
        phoneNumber: this.registration.value.phoneNumber,
        password: this.registration.value.password,
        dateofbirth: this.registration.value.dateofbirth,
        gender: this.registration.value.gender,
        address: this.registration.value.address,
        createdDateTime: date,
        createdBy: 1,
        updatedDateTime: null,
        updatedBy: null,
        active: true,
        activationDate: date,
        activationKey: "Yes"
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Added Successfully") {
          this.toast.showSuccess("Customer Added", "Success");
          this.route.navigateByUrl('customer/list')
        } else if (res == "Customer already exists") {
          this.toast.showError("This Email is Already Used", "Error");
        } else {
          this.toast.showError("Something Went Wrong", "Error");
        }
      });
    }
  }
}
// Customer already exists