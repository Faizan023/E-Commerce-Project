import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {
  ListCategory !: FormGroup
  CategoryList: any = [];
  p: number = 1;
  popOverMsg: string = "Do you really want to delete?";
  cancelClicked: boolean = false;
  itemPerPage: number = 10;
  constructor(private http: HttpClient, private toastr: NotificationService, private router: Router, private form: FormBuilder) { }
  ngOnInit(): void {
    this.LoadCategory();
    this.ListCategory = this.form.group({
      search: [''],
    });
  }

  removecategory(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteCategory/' + id, { responseType: 'json' }).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toastr.showSuccess("Deleted Successfully", "Success");
        this.LoadCategory();
      } else {
        this.toastr.showError("Something went Wrong", "Error");
      }
    });
  }
  updatecategory(id: number) {
    this.router.navigate(['category/update/' + id]);
  }

  Search() {
    this.FindCategory;
  }
  get FindCategory() {
    let serachValue = this.ListCategory.controls['search'].value as string
    if (serachValue == "" || serachValue == null) {
      return this.CategoryList;
    } else {
      return this.CategoryList.filter((find: any) => {
        return (
          find.id.toString().includes(serachValue) ||
          find.name.toLowerCase().includes(serachValue.toLowerCase())
        );
      });
    }
  }
  LoadCategory() {
    this.http.get('http://localhost:5209/api/Controller/GetCategories').subscribe(res => {
      this.CategoryList = res
    });
  }

}
