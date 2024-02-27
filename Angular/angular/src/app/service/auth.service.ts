import { HttpClient } from "@angular/common/http";
import { createInjectableType } from "@angular/compiler";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient, private router: Router) { }

    currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
    jwtHelperService = new JwtHelperService();

    RegisterUser(user: Array<string>) {
        var date = new Date();
        return this.http.post("http://localhost:5209/api/Controller/InsertCustomer", {
            firstName: user[0],
            lastName: user[1],
            email: user[2],
            phoneNumber: user[3],
            password: user[4],
            dateOfBirth: user[5],
            gender: user[6],
            address: user[7],
            createdDateTime: date,
            createdBy: 0,
            updatedDateTime: null,
            updatedBy: null,
            active: true,
            activationDate: date,
            activationKey: 'yes',
        }, { responseType: 'text' })
    }

    LoginUser(email: string, password: string) {
        return this.http.post("http://localhost:5209/api/SignIn/LoginToken", {
            email,
            password
        }, { responseType: 'text' });
    }

    setToken(token: string) {
        localStorage.setItem('token', token);
        this.LoadCurrentUser();
    }

    LoadCurrentUser() {
        const currentToken = localStorage.getItem('token');
    }

    getToken(): string {
        return String(localStorage.getItem('token'));
    }

    isTokenExpired(token: string) {
        const userInfo = this.jwtHelperService.decodeToken(token);
        const expDate = userInfo.exp * 1000;
        const currentDate = new Date().getTime();
        if (currentDate > expDate) {
            localStorage.removeItem("token");
        }
        return currentDate > expDate;
    }
}
