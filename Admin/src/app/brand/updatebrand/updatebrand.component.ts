import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-updatebrand',
  templateUrl: './updatebrand.component.html',
  styleUrls: ['./updatebrand.component.css']
})

export class UpdatebrandComponent implements OnInit {
  updatebrandform!: FormGroup;
  brandId: number = 0;
  branddetail: any = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient, private toastr: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.brandId = +res['id']; // convert int to number
    });

    this.http.get('http://localhost:5209/api/Controller/GetBrandBy/' + this.brandId).subscribe(res => {
      this.branddetail = res;
      this.updatebrandform.patchValue({
        name: this.branddetail.name
      });
    });

    this.updatebrandform = this.fb.group({
      name: ['', Validators.required]
    });
  }

  updatebrand() {
    var date = new Date();
    if (this.updatebrandform.valid) {
      this.http.put('http://localhost:5209/api/Controller/UpdateBrand/' + this.brandId, {
        id: this.brandId,
        name: this.updatebrandform.value.name,
        createDateTime: this.branddetail.createDateTime,
        updateDateTime: date,
        createdby: this.branddetail.createdby,
        updatedBy: 1
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Updated Successfully") {
          this.toastr.showSuccess("Updated Successfully", "Success");
          this.router.navigateByUrl('brand');
        } else {
          this.toastr.showError("Something went Wrong", "Error");
        }
      });
    }
  }
}
