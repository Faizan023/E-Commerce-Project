import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';
import { AuthService } from 'src/app/service/service.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
})
export class UpdateComponent implements OnInit {
  UpdateForm !: FormGroup;
  productId: number = 0;
  update: any = [];
  categoryList: any = [];
  brandList: any = [];
  // update: Array<{ id: number, img: any, name: string, categoryId: number, description: string, price: number, discount: number, quantity: number, color: string, measurment: string, mesurmentValue: string, brandId: number }> = [];
  constructor(private UpdateDetails: FormBuilder, private http: HttpClient, private mid: ActivatedRoute, private route: Router, private service:
    AuthService, private toaster: NotificationService) { }

  ngOnInit(): void {

    this.mid.params.subscribe(res => {
      this.productId = +res['id'];
    });

    this.UpdateForm = this.UpdateDetails.group({
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
    this.loadproduct();
    this.LoadCategory();
    this.LoadBrand();
  }

  loadproduct() {
    this.http.get<any>('http://localhost:5209/api/Controller/GetProductBy/' + this.productId).subscribe(res => {
      this.update = res;

      this.UpdateForm.patchValue({
        // img: this.update.img,
        name: this.update.name,
        categoryId: this.update.categoryId,
        description: this.update.description,
        price: this.update.price,
        discount: this.update.discount,
        quantity: this.update.quantity,
        color: this.update.color,
        measurment: this.update.measurment,
        mesurmentValue: this.update.mesurmentValue,
        brandId: this.update.brandId
      });
    });
  }

  UpdatePropduct() {
    this.service.UpdateProduct([
      this.productId,
      this.UpdateForm.value.img,
      this.UpdateForm.value.name,
      this.UpdateForm.value.categoryId,
      this.UpdateForm.value.description,
      this.UpdateForm.value.price,
      this.UpdateForm.value.discount,
      this.UpdateForm.value.quantity,
      this.UpdateForm.value.color,
      this.UpdateForm.value.measurment,
      this.UpdateForm.value.mesurmentValue,
      this.UpdateForm.value.brandId,
    ]).subscribe(res => {
      if (res == "Updated Successfully") {
        this.route.navigateByUrl('/product');
      }
    });
    this.toaster.showSuccess('Success', 'Updated Successfully');
  }

  LoadCategory() {
    this.http.get('http://localhost:5209/api/Controller/GetCategories').subscribe(res => {
      this.categoryList = res;
    });
  }

  LoadBrand() {
    this.http.get('http://localhost:5209/api/Controller/GetBrands').subscribe(res => {
      this.brandList = res;
    });
  }
}



