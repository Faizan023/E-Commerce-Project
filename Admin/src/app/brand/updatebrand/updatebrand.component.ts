import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-updatebrand',
  templateUrl: './updatebrand.component.html',
  styleUrls: ['./updatebrand.component.css']
})

export class UpdatebrandComponent implements OnInit {
  updatebrandform!: FormGroup;
  brandId: number = 0;
  branddetail: any = [];

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private http: HttpClient) { }

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
    if (this.updatebrandform.valid) {
      this.http.put('http://localhost:5209/api/Controller/UpdateBrand/' + this.brandId, {
        id: this.brandId,
        name: this.updatebrandform.value.name,
        createDateTime: "2023-10-11",
        updateDateTime: "2023-10-11",
        createdby: 1,
        updatedBy: 1
      }).subscribe(res => {
        
      });
    }
  }
}
