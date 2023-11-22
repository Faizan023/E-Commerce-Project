import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/service.service';
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
  UpdateForm!: FormGroup
  p: number = 1;
  ngOnInit(): void {
    this.http.get<any>('http://localhost:5209/api/Controller/GetProduct').subscribe(res => {
      this.product = res
    }
    );
    this.UpdateForm = this.form.group({
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

  }

  Delete(id: number) {
    // alert("Are you sure want to delete" + id + "product");
    this.http.delete('http://localhost:5209/api/Controller/DeleteProduct' + '/' + id).subscribe(res => {
      console.log(res);
    });
  }

  update(id: number): void {
    this.route.navigate(['product/update', id]);
  }
}
