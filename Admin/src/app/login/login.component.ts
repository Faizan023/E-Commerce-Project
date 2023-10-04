import { Route, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  AdminLogin!: FormGroup
  constructor(private form: FormBuilder, private auth: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.AdminLogin = this.form.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  OnLogin() {
    if (this.AdminLogin.valid) {
      this.auth.login(this.AdminLogin.value.email, this.AdminLogin.value.password).subscribe(res => {
        if (res == "Check Email or Password") {
          console.log("Check Email or Password");
        } else {
          localStorage.setItem('token', res);
          console.log("Login Successfully");
          this.route.navigateByUrl('/product');
          window.alert("Login Successfully");
        }
      })
    }
  }
}
