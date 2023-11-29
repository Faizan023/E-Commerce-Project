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
    var date = new Date();
    this.http.put('http://localhost:5209/api/Controller/UpdateProduct', {
      id: this.productId,
      img: this.UpdateForm.value.img,
      name: this.UpdateForm.value.name,
      categoryId: this.UpdateForm.value.categoryId,
      description: this.UpdateForm.value.description,
      price: this.UpdateForm.value.price,
      discount: this.UpdateForm.value.discount,
      quantity: this.UpdateForm.value.quantity,
      color: this.UpdateForm.value.color,
      measurment: this.UpdateForm.value.measurment,
      mesurmentValue: this.UpdateForm.value.mesurmentValue,
      brandId: this.UpdateForm.value.brandId,
      createdDateTime: this.update.createdDateTime,
      updatedDateTime: date,
      createdBy: this.update.createdBy,
      updatedBy: 1
    }, { responseType: 'text' }).subscribe(res => {
      if (res == "Updated Successfully") {
        this.toaster.showSuccess("Updated Successfully", "Success");
        this.route.navigateByUrl('/product');
      }
    });
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



