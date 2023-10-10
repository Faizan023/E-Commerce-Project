import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

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

  insertproduct(product: any) {
    return this.http.post("http://localhost:5209/api/Controller/InsertProduct", {
      img: product[0],
      name: product[1],
      categoryId: product[2],
      description: product[3],
      price: product[4],
      discount: product[5],
      quantity: product[6],
      color: product[7],
      measurment: product[8],
      mesurmentValue: product[9],
      brandId: product[10],
      createdDateTime: '2023-09-02',
      updatedDateTime: null,
      createdBy: 1,
      updatedBy: null,
    }, { responseType: 'text' })
  }

  UpdateProduct(product: any) {
    return this.http.put('http://localhost:5209/api/Controller/UpdateProduct', {
      id: product[0],
      img: product[1],
      name: product[2],
      categoryId: product[3],
      description: product[4],
      price: product[5],
      discount: product[6],
      quantity: product[7],
      color: product[8],
      measurment: product[9],
      mesurmentValue: product[10],
      brandId: product[11],
      createdDateTime: '2023-10-19',
      updatedDateTime: null,
      createdBy: 1,
      updatedBy: null
    }, { responseType: 'text' })

  }
}
