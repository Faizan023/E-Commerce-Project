import { Route, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(private Route: Router){}
logout(){
  localStorage.clear();
  this.Route.navigateByUrl('/login');
}

}
