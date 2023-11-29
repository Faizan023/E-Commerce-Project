import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-addsale',
  templateUrl: './addsale.component.html',
  styleUrls: ['./addsale.component.css']
})
export class AddsaleComponent implements OnInit {
  addsaleform!: FormGroup
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: NotificationService, private router: Router) { }
  ngOnInit(): void {
    this.addsaleform = this.fb.group({
      name: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
  }

  addsale() {
    var date = new Date();
    if (this.addsaleform.valid) {
      this.http.post('http://localhost:5209/api/Controller/InsertSale', {
        name: this.addsaleform.value.name,
        startDate: this.addsaleform.value.startDate,
        endDate: this.addsaleform.value.endDate,
        createDateTime: date,
        updateDateTime: null,
        createdBy: 1,
        updatedBy: null
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Added Successfully") {
          this.toastr.showSuccess("Added Successfully", "Success");
          this.addsaleform.reset();
          this.router.navigateByUrl('/sale/list');
        } else {
          this.toastr.showError("Something went Wrong", "Error");
        }
      });
    }
  }
}
