import { HttpClient, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-updatesale',
  templateUrl: './updatesale.component.html',
  styleUrls: ['./updatesale.component.css']
})
export class UpdatesaleComponent implements OnInit {
  saleupdateform!: FormGroup;
  saleId: number = 0;
  saledetail: any = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private fb: FormBuilder, private toastr: NotificationService, private router: Router) { }
  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.saleId = +res['id'];

      this.http.get('http://localhost:5209/api/Controller/GetSaleById/' + this.saleId).subscribe(res => {
        this.saledetail = res;
        this.saleupdateform.patchValue({
          name: this.saledetail.name,
          startDate: this.saledetail.startDate,
          endDate: this.saledetail.endDate,
        });
      });
    });
    this.saleupdateform = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  updatesale() {
    if (this.saleupdateform.valid) {
      this.http.put('http://localhost:5209/api/Controller/UpdateSale/' + this.saleId, {
        id: this.saleId,
        name: this.saleupdateform.value.name,
        startDate: this.saleupdateform.value.startDate,
        endDate: this.saleupdateform.value.endDate,
        createDateTime: this.saledetail.createDateTime,
        updateDateTime: '2023-11-11',
        createdBy: this.saledetail.createdBy,
        updatedBy: 1
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Updated Successfully") {
          this.toastr.showSuccess('Success', 'updated Successfully');
          this.router.navigateByUrl('/sale/list');
        } else {
          this.toastr.showError("Something went Wrong", "Error");
        }
      });
    }
  }
}
