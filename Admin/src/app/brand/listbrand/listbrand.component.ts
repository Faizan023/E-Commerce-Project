import { filter } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listbrand',
  templateUrl: './listbrand.component.html',
  styleUrls: ['./listbrand.component.css']
})
export class ListbrandComponent implements OnInit {
  ListBrand!: FormGroup;
  BrandList: Array<{ id: number, name: string }> = [];
  p: number = 1;

  constructor(private http: HttpClient, private toastr: NotificationService, private router: Router, private form: FormBuilder) { }

  ngOnInit(): void {
    this.LoadBrand();
    this.ListBrand = this.form.group({
      search: [''],
    });
  }

  removebrand(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteBrand/' + id, { responseType: 'json' }).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toastr.showSuccess("Deleted Successfully", "Success");
        this.LoadBrand();
      } else {
        this.toastr.showError("Somethin went Wrong", "Error");
      }
    });
  }

  updatebrand(id: number) {
    this.router.navigate(['brand/update/' + id]);
  }

  Search() {
    this.FindBrand;
  }
  get FindBrand() {
    let serachValue = this.ListBrand.controls['search'].value as string
    if (serachValue == "" || serachValue == null) {
      return this.BrandList;
    } else {
      return this.BrandList.filter((find: any) => {
        return (
          find.id.toString().includes(serachValue) ||
          find.name.toLowerCase().includes(serachValue.toLowerCase())
        );
      });
    }
  }
  LoadBrand() {
    this.http.get<any>('http://localhost:5209/api/Controller/GetBrands').subscribe(res => {
      this.BrandList = res;
    });
  }
}