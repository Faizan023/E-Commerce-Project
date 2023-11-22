import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit {
  CategoryList: any = [];
  p:number = 1;
  constructor(private http: HttpClient, private toastr: NotificationService, private router: Router) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetCategories').subscribe(res => {
      this.CategoryList = res
    })
  }

  removecategory(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteCategory/' + id).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toastr.showWarning('Deleted', "YOur Category Is Deleted");
      }
    });
  }
  updatecategory(id: number) {
    this.router.navigate(['category/update/' + id]);
  }
}
