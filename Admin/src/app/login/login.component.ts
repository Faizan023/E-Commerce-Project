import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/service.service';
import { NotificationService } from '../notification.service';
import { StorageKey } from '../helper/comman-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  AdminLogin!: FormGroup
  constructor(private form: FormBuilder, private auth: AuthService, private route: Router, private toastr: NotificationService) { }
  seePassword: boolean = false;
  ngOnInit(): void {
    this.AdminLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  OnLogin() {
    if (this.AdminLogin.valid) {
      this.auth.login(this.AdminLogin.value.email, this.AdminLogin.value.password).subscribe(res => {
        if (res == "Check Email or Password") {
          console.log("Check Email or Password");
          this.toastr.showError('Error', 'Check Email or Password');
        } else {
          // localStorage.setItem(StorageKey.IsLoggedIn, "true");
          localStorage.setItem('token', res);
          // console.log("Login Successfully");
          this.route.navigateByUrl('/dashboard');
          this.toastr.showSuccess('Success', "Login Successfully");
        }
      });
    }
  }
  SeePassword() {
    // var password = this.AdminLogin.controls['password'].value;
    if (this.seePassword == true) {
      this.seePassword = false;

    } else {
      this.seePassword = true;
    }
  }
}
