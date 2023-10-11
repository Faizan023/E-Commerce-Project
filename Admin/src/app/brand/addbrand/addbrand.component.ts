import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-addbrand',
  templateUrl: './addbrand.component.html',
  styleUrls: ['./addbrand.component.css']
})
export class AddbrandComponent implements OnInit {
  addbrandform!: FormGroup
  constructor(private fb: FormBuilder, private http: HttpClient, private toastr: NotificationService) { }
  ngOnInit(): void {
    this.addbrandform = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addBrand() {
    if (this.addbrandform.valid) {
      console.log('click');
      this.http.post('http://localhost:5209/api/Controller/InsertBrand', {
        name: this.addbrandform.value.name,
        createDateTime: '2023-11-11',
        updateDateTime: null,
        createdby: 1,
        updatedBy: null
      }, { responseType: 'text' }).subscribe(b => {
        if (b == 'Added Successfully') {
          console.log("Added Successfully");
          this.toastr.showSuccess('Success', 'Added Successfully');
        } else {
          console.log('Something Went Wrong');
        }
      })
    }
  }
}
