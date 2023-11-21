import { AuthService } from './../service/auth.service';
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'register',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
})
export class RegisterComponent implements OnInit {
    registration!: FormGroup
    displaymsg = 'hey';
    constructor(private user: FormBuilder, private auth: AuthService) { }
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
        if (this.registration.valid) {
            this.auth.RegisterUser([
                this.registration.value.firstName,
                this.registration.value.lastName,
                this.registration.value.email,
                this.registration.value.phoneNumber,
                this.registration.value.password,
                this.registration.value.dateofbirth,
                this.registration.value.gender,
                this.registration.value.address,
            ]).subscribe(t => {
                if (t == "Added Successfully") {
                    this.displaymsg = "Account Created"
                } else {
                    this.displaymsg = "use Another Email Account"
                }
            }
            );
        }
    }

}