import { SidebarComponent } from './../sidebar/sidebar.component';
import { Route, Router } from '@angular/router';
import { Component, EventEmitter, Output } from '@angular/core';
// import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  // @Output() toggle = new EventEmitter<void>();
  // isopen: boolean = true;
  constructor(private Route: Router) { }
  logout() {
    localStorage.clear();
    this.Route.navigateByUrl('/login');
  }

  toggleSidebar() {
    document.body.classList.toggle('toggle-sidebar');
  }
}
