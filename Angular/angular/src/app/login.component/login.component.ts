import { HttpClient } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthService } from "../service/auth.service";
import { Router } from "@angular/router";
import { NotificationService } from "../notification.service";
import { CustomerService } from "../customer.service";

@Component({
    selector: 'login-component',
    templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

    Login!: FormGroup
    Loginmsg = '';
    seePassword: boolean = false;
    constructor(private validation: FormBuilder, private Auth: AuthService, private route: Router, private toastr: NotificationService, private customerService: CustomerService) { }

    ngOnInit(): void {
        this.Login = this.validation.group({
            email: ['', Validators.required],
            password: ['', Validators.required]
        });
    }

    LoginUser() {
        this.Auth.LoginUser(this.Login.value.email, this.Login.value.password).subscribe((res) => {
            if (res == "Check Email or Password") {
                this.Loginmsg = "Please Check Your Email or Password";
                this.toastr.showWarning("Warning", "Invalid Email or password");
            } else {
                this.toastr.showSuccess("Success", "Login Successfully");
                this.Auth.setToken(res);
                // localStorage.setItem('details', res);
                this.route.navigateByUrl('/home');
                // this.Login.reset();
            }
        });
    }
    PasswordType() {
        if (this.seePassword == true) {
            this.seePassword = false;
        } else {
            this.seePassword = true;
        }
    }
}