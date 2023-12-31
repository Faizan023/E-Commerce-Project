import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: any = [];
  constructor(private http: HttpClient, private route: Router, private auth: AuthService) { }
  ngOnInit(): void {
    this.http.get('http://localhost:5209/api/Controller/GetProduct',).subscribe((res: any) => {
      this.products = res;
    });

  }
  GetProduct(id: number) {
    this.route.navigate(["/product/" + id]);
    // console.log(id);
  }
}
