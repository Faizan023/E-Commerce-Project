import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  ProductForm!: FormGroup
  brandList: any = [];
  categoryList: any = [];
  constructor(private product: FormBuilder, private Auth: AuthService, private http: HttpClient) { }
  file: File | undefined;
  ngOnInit(): void {
    this.ProductForm = this.product.group({
      img: ['',],
      name: ['', Validators.required],
      categoryId: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      quantity: ['', Validators.required],
      color: ['', Validators.required],
      measurment: ['', Validators.required],
      mesurmentValue: ['', Validators.required],
      brandId: ['', Validators.required],
    });
    this.BrandList();
    this.categoryList();
  }

  AddProduct() {

    if (this.ProductForm.valid) {

      this.Auth.insertproduct([
        this.ProductForm.value.img,
        this.ProductForm.value.name,
        this.ProductForm.value.categoryId,
        this.ProductForm.value.description,
        this.ProductForm.value.price,
        this.ProductForm.value.discount,
        this.ProductForm.value.quantity,
        this.ProductForm.value.color,
        this.ProductForm.value.measurment,
        this.ProductForm.value.mesurmentValue,
        this.ProductForm.value.brandId,
      ]).subscribe(res => {
        console.log(res);
        if (res == "Added Successfully") {
          console.log("Added Successfully");
          this.ProductForm.reset();
        } else {
          console.log("Something Went Wrong");
        }
      });
    }
  }

  BrandList() {
    this.Auth.BrandList().subscribe(res => {
      this.brandList = res;
    });
  }

  CategoryList() {
    this.http.get('http://localhost:5209/api/Controller/GetCategories').subscribe(res => {
      this.categoryList = res;
    });
  }

}
