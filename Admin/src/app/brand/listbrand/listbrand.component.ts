import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listbrand',
  templateUrl: './listbrand.component.html',
  styleUrls: ['./listbrand.component.css']
})
export class ListbrandComponent implements OnInit {

  BrandList: Array<{ id: number, name: string }> = [];

  constructor(private http: HttpClient, private toastr: NotificationService, private router: Router) { }

  ngOnInit(): void {

    this.http.get<any>('http://localhost:5209/api/Controller/GetBrands').subscribe(res => {
      this.BrandList = res;

    });
  }

  removebrand(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteBrand/' + id).subscribe(res => {
      console.log(res);
    });
  }

  updatebrand(id: number) {
    this.router.navigate(['brand/updatebrand/' + id]);
  }
}
