import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    Login!: FormGroup
    Loginmsg = '';
    constructor(private validation: FormBuilder, private Auth: AuthService, private route: Router) { }

    ngOnInit(): void {
        this.Login = this.validation.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    LoginUser() {
        this.Auth.LoginUser(this.Login.value.email, this.Login.value.password).subscribe((res) => {
            if (res == "Check Email or Password") {
                this.Loginmsg = "Please Check Your Email or Password";
                console.log(res);
            } else {
                localStorage.setItem('token', res);
                this.Login.reset();
                this.route.navigateByUrl('/home');
            }
        });
    }
}