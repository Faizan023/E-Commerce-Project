import { JwtHelperService } from '@auth0/angular-jwt';
import { Component, OnInit } from "@angular/core";
import { Route, Router } from '@angular/router';

@Component({
    selector: 'home-component',
    templateUrl: './home.component.html'
})
export class HomeComponent {

    constructor(private router: Router) { }
}