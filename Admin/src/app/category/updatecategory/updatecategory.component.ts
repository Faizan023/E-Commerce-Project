import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NotificationService } from 'src/app/notification.service';

@Component({
  selector: 'app-updatecategory',
  templateUrl: './updatecategory.component.html',
  styleUrls: ['./updatecategory.component.css']
})
export class UpdatecategoryComponent implements OnInit {
  updatecategoryform!: FormGroup;
  categoryId: number = 0;
  categorydetail: any = [];
  constructor(private route: ActivatedRoute, private fb: FormBuilder, private http: HttpClient, private toastr: NotificationService, private router: Router) { }

  ngOnInit(): void {

    this.route.params.subscribe(res => {
      this.categoryId = +res['id'];
    });

    this.http.get('http://localhost:5209/api/Controller/GetCategoryBy/' + this.categoryId).subscribe(res => {
      this.categorydetail = res
      this.updatecategoryform.patchValue({
        name: this.categorydetail.name
      });
    });

    this.updatecategoryform = this.fb.group({
      name: ['', Validators.required]
    });
  }

  updatecategory() {
    var date = new Date();
    if (this.updatecategoryform.valid) {
      this.http.put('http://localhost:5209/api/Controller/UpdateCategory/' + this.categoryId, {
        id: this.categoryId,
        name: this.updatecategoryform.value.name,
        createDateTime: this.categorydetail.createDateTime,
        updateDateTime: date,
        createdBy: this.categorydetail.createdBy,
        updatedBy: 1
      }, { responseType: 'text' }).subscribe(res => {
        if (res == "Updated Successfully") {
          this.toastr.showSuccess('Success', 'Updated Successfully');
          this.router.navigateByUrl('category');
        } else {
          this.toastr.showError("Something Went Wrong", "Error");
        }
      });
    }
  }
}
