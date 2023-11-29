import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.css']
})
export class AddbrandComponent implements OnInit {
  addbrandform!: FormGroup
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: NotificationService, private route: Router) { }
  ngOnInit(): void {
    this.addbrandform = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addBrand() {
    var date = new Date();
    if (this.addbrandform.valid) {
      this.http.post('http://localhost:5209/api/Controller/InsertBrand', {
        name: this.addbrandform.value.name,
        createDateTime: date,
        updateDateTime: null,
        createdby: 1,
        updatedBy: null
      }, { responseType: 'text' }).subscribe(b => {
        if (b == 'Added Successfully') {
          this.toastr.showSuccess('Success', 'Added Successfully');
          this.route.navigateByUrl('brand');
        } else {
          console.log('Something Went Wrong');
        }
      });
    }
  }
}
