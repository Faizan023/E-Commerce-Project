import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }
  currentUser: BehaviorSubject<any> = new BehaviorSubject(null);
  jwtHelperService = new JwtHelperService();
  register(user: Array<string>) {
    return this.http.post("http://localhost:5209/api/Controller/InsertUser", {
      firstName: user[0],
      lastName: user[1],
      roleId: user[2],
      email: user[3],
      password: user[4],
      CreateDateTime: '2023-09-03',
      UpdateDateTime: null,
      CreatedBy: 1,
      UpdatedBy: null,
    }, { responseType: 'text' })
  }

  login(email: string, password: string) {
    return this.http.post("http://localhost:5209/api/Controller", {
      email,
      password
    }, { responseType: 'text' })
  }

  getToken(): string {
    return String(localStorage.getItem('token'));
  }

  IsTokenExpired(token: string) {
    const userInfo = this.jwtHelperService.decodeToken(token);
    const expDate = userInfo.exp * 1000;
    const currentDate = new Date().getTime();
    return currentDate > expDate;
  }
  // insertproduct(product: any) {
  //   var date = new Date();
  //   return this.http.post("http://localhost:5209/api/Controller/InsertProduct", {
  //     img: product[0],
  //     name: product[1],
  //     categoryId: product[2],
  //     description: product[3],
  //     price: product[4],
  //     discount: product[5],
  //     quantity: product[6],
  //     color: product[7],
  //     measurment: product[8],
  //     mesurmentValue: product[9],
  //     brandId: product[10],
  //     createdDateTime: date,
  //     updatedDateTime: null,
  //     createdBy: 1,
  //     updatedBy: null,
  //   }, { responseType: 'text' })
  // }

  // UpdateProduct(product: any) {
  //   var date = new Date();
  //   return this.http.put('http://localhost:5209/api/Controller/UpdateProduct', {
  //     id: product[0],
  //     img: product[1],
  //     name: product[2],
  //     categoryId: product[3],
  //     description: product[4],
  //     price: product[5],
  //     discount: product[6],
  //     quantity: product[7],
  //     color: product[8],
  //     measurment: product[9],
  //     mesurmentValue: product[10],
  //     brandId: product[11],
  //     createdDateTime: product[12],
  //     updatedDateTime: date,
  //     createdBy: 1,
  //     updatedBy: 1
  //   }, { responseType: 'text' })
  // }

  // BrandList() {
  //   return this.http.get('http://localhost:5209/api/Controller/GetBrands');
  // }

  // AddCustomer(customer: any) {
  //   return this.http.post("http://localhost:5209/api/Controller/InsertCustomer", {
  //     firstName: customer[0],
  //     lastName: customer[1],
  //     email: customer[2],
  //     phoneNumber: customer[3],
  //     password: customer[4],
  //     dateofbirth: customer[5],
  //     gender: customer[6],
  //     address: customer[7],
  //     createdDateTime: "2023-11-21",
  //     createdBy: null,
  //     updatedDateTime: "2023-11-21",
  //     updatedBy: null,
  //     active: true,
  //     activationDate: "2023-11-21",
  //     activationKey: "Yes"
  //   }, { responseType: 'text' })
  // }
}
