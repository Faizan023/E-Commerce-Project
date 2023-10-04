import { HttpClient } from "@angular/common/http";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    RegisterUser(user: Array<string>) {
        return this.http.post("http://localhost:5209/api/Controller/InsertCustomer", {
            firstName: user[0],
            lastName: user[1],
            email: user[2],
            phoneNumber: user[3],
            password: user[4],
            dateOfBirth: user[5],
            gender: user[6],
            address: user[7],
            createdDateTime: '2024-09-12',
            createdBy: 0,
            updatedDateTime: null,
            updatedBy: null,
            active: true,
            activationDate: '2024-09-19',
            activationKey: 'yes',
        }, { responseType: 'text' })
    }

    LoginUser(email: string, password: string) {
        return this.http.post("http://localhost:5209/api/SignIn/LoginToken", {
            email,
            password
        }, { responseType: 'text' });
    }

}
