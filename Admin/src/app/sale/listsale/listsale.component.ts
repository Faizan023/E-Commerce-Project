import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-listsale',
  templateUrl: './listsale.component.html',
  styleUrls: ['./listsale.component.css']
})
export class ListsaleComponent implements OnInit {
  // SaleList: Array<{ id: number, name: string, startDate: Date, endDate: Date }> =[];
  ListSale!: FormGroup;
  SaleList: any = [];
  constructor(private http: HttpClient, private toastr: NotificationService, private router: Router, private form: FormBuilder) { }
  p: number = 1;
  popOverMsg: string = "Do you really want to delete?";
  cancelClicked: boolean = false;
  itemsPerPage: number = 10;
  ngOnInit(): void {
    this.LoadSale();
    this.ListSale = this.form.group({
      search: [''],
    });
  }

  removesale(id: number) {
    this.http.delete('http://localhost:5209/api/Controller/DeleteSale/' + id, { responseType: 'json' }).subscribe(res => {
      if (res == "Deleted Successfully") {
        this.toastr.showSuccess('Successfully Deleted', "Success");
        this.LoadSale();
      } else {
        this.toastr.showError("Something went Wrong", "Error");
      }
    });
  }
  updatesale(id: number) {
    this.router.navigateByUrl('/sale/update/' + id);
  }

  Search() {
    this.FindSale;
  }

  get FindSale() {
    let serachValue = this.ListSale.controls['search'].value as string
    if (serachValue == "" || serachValue == null) {
      return this.SaleList;
    } else {
      return this.SaleList.filter((find: any) => {
        return (
          find.name.toLowerCase().includes(serachValue.toLowerCase()) ||
          find.id.toString().includes(serachValue)
        );
      });
    }
  }
  LoadSale() {
    this.http.get('http://localhost:5209/api/Controller/GetSales').subscribe(res => {
      this.SaleList = res;
    });
  }
}
