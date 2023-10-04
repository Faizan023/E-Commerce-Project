import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/service.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
})
export class ProductComponent implements OnInit {
  ProductForm!: FormGroup
  constructor(private product: FormBuilder, private Auth: AuthService) { }
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
    })

  }

  AddProduct() {
    console.log(this.ProductForm.valid);
    console.log(this.ProductForm.value);
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
      })
    }
  }

}
