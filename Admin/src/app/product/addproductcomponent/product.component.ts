import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { PathLocationStrategy } from '@angular/common';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  ProductForm!: FormGroup
  brandList: any = [];
  categoryList: any = [];
  image: any = [];
  // files: File = this.image;
  constructor(private product: FormBuilder, private Auth: AuthService, private http: HttpClient, private route: Router, private toastr: NotificationService) { }

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
      deliveryCharge: ['', Validators.required]
    });
    this.BrandList();
    this.CategoryList();
  }

  AddProduct() {
    var date = new Date();
    if (this.ProductForm.valid) {
      this.http.post("http://localhost:5209/api/Controller/InsertProduct", {
        img: this.image.split(',')[1],
        name: this.ProductForm.value.name,
        categoryId: this.ProductForm.value.categoryId,
        description: this.ProductForm.value.description,
        price: this.ProductForm.value.price,
        discount: this.ProductForm.value.discount,
        quantity: this.ProductForm.value.quantity,
        color: this.ProductForm.value.color,
        measurment: this.ProductForm.value.measurment,
        mesurmentValue: this.ProductForm.value.mesurmentValue,
        brandId: this.ProductForm.value.brandId,
        deliveryCharge: this.ProductForm.value.deliveryCharge,
        createdDateTime: date,
        updatedDateTime: null,
        createdBy: 1,
        updatedBy: null
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Added Successfully") {
          this.ProductForm.reset();
          this.route.navigateByUrl('product');
          this.toastr.showSuccess("Added Successfully", "Success");
        } else {
          this.toastr.showError("Something went Wrong", "Error");
          console.log("Something Went Wrong");
        }
      });
    }
  }

  BrandList() {
    this.http.get('http://localhost:5209/api/Controller/GetBrands').subscribe(res => {
      this.brandList = res;
    });
  }

  CategoryList() {
    this.http.get('http://localhost:5209/api/Controller/GetCategories').subscribe(res => {
      this.categoryList = res;
      console.log(res);
    });
  }

  selectFile(event: any): void {
    var file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      // Convert the image to Base64 and store it in this.image
      this.image = reader.result as string;
      console.log(this.image);
    };
    reader.readAsDataURL(file);
  }
}
