import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit {
  product: Array<{ id: number, img: any, name: string, categoryId: number, description: string, price: number, discount: number, quantity: number, color: string, measurment: string, mesurmentValue: string, brandId: number }> = [];
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>('http://localhost:5209/api/Controller/GetProduct').subscribe(res => {
      this.product = res
    }
    )
  }

  Delete(id: number) {
    window.alert("Are you sure want to delete"+ id + "this product");
    this.http.delete('http://localhost:5209/api/Controller/DeleteProduct' + '/' + id).subscribe(res => {
      console.log(res);
    })
  }

}
