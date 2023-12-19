import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  customerDetails: any = [];
  constructor() { }

  setCustomerDetails(details: any) {
    this.customerDetails = details;
  }

  getCustomerDetails() {
    return this.customerDetails;
  }
}
