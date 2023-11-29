import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  addcategoryform!: FormGroup

  constructor(private fb: FormBuilder, private http: HttpClient, private tostr: NotificationService, private router: Router) { }

  ngOnInit(): void {
    this.addcategoryform = this.fb.group({
      name: ['', Validators.required]
    });
  }

  addcategory() {
    var date = new Date();
    if (this.addcategoryform.valid) {
      this.http.post('http://localhost:5209/api/Controller/InsertCategory', {
        name: this.addcategoryform.value.name,
        createDateTime: date,
        updateDateTime: null,
        createdBy: 1,
        updatedBy: null,
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Added Successfully") {
          this.tostr.showSuccess('Added Successfully', "Success");
          this.router.navigateByUrl('/category/list');
        } else {
          this.tostr.showError("Something went Wrong", "Error");
        }
      });
    }
  }
}
