import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../service/service.service';
import { Subscriber } from 'rxjs';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  AdminRegister!: FormGroup

  constructor(private form: FormBuilder, private auth: AuthService, private toastr: NotificationService) { }
  ngOnInit(): void {
    this.AdminRegister = this.form.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      roleId: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@#$!%*?&])[A-Za-z0-9\d$@#$!%*?&].{8,15}')]],
    })
  }

  register() {
    if (this.AdminRegister.valid) {
      console.log(this.AdminRegister.valid);
      this.auth.register([
        this.AdminRegister.value.firstName,
        this.AdminRegister.value.lastName,
        this.AdminRegister.value.roleId,
        this.AdminRegister.value.email,
        this.AdminRegister.value.password,
      ]).subscribe(res => {

        if (res == "This Email Already Exist, Use Another Email") {
          console.log('This Email Already Exist, Use Another Email');
          this.toastr.showError('Error', 'Try Another Email');
        }
        else {
          console.log("Added Successfully");
          this.toastr.showSuccess('Success', 'Youre Registered');
        }
      })

    }
  }
}
