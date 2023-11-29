import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  product: Array<{ id: number, img: any, name: string, categoryId: number, description: string, price: number, discount: number, quantity: number, color: string, measurment: string, mesurmentValue: string, brandId: number }> = [];
  constructor(private http: HttpClient, private route: Router, private form: FormBuilder, private toastr: NotificationService) { }
  ListProduct!: FormGroup
  p: number = 1;

  ngOnInit(): void {
    this.LoadProduct();
    this.ListProduct = this.form.group({
      search: [''],
    });
  }

  Delete(id: number) {
    // alert("Are you sure want to delete" + id + "product");
    this.http.delete('http://localhost:5209/api/Controller/DeleteProduct' + '/' + id, { responseType: 'json' }).subscribe(res => {
      console.log(res);
      if (res == "Deleted Successfully") {
        this.toastr.showSuccess("Deleted Successfully", "Success");
        this.LoadProduct();
      } else {
        this.toastr.showError("Something went Wrong", "Error");
      }
    });
  }

  update(id: number): void {
    this.route.navigate(['product/update', id]);
  }

  Search() {
    this.FindProduct;
  }

  get FindProduct() {
    let serachValue = this.ListProduct.controls['search'].value as string
    if (serachValue == "" || serachValue == null) {
      return this.product;
    } else {
      return this.product.filter((find: any) => {
        return (
          find.name.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.price.toString().includes(serachValue.toLowerCase()) ||
          find.id.toString().includes(serachValue)
        );
      });
    }
  }
  LoadProduct() {
    this.http.get<any>('http://localhost:5209/api/Controller/GetProduct').subscribe(res => {
      this.product = res
    });
  }
}
