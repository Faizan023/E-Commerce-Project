import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  constructor(private http: HttpClient, private route: Router) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetProduct',).subscribe((res: any) => {
      // const base64Image = btoa(new Uint8Array(res).reduce((res, byte) => res + String.fromCharCode(byte), ''));
      // this.products = 'data:image/jpeg;base64,' + base64Image
      this.products = res;
    });
  }
  GetProduct(id: number) {
    this.route.navigate(["/product/" + id]);
    // console.log(id);
  }
}
