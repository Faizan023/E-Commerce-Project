import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  logout() {
    localStorage.removeItem('details');
    localStorage.removeItem('token');
  }
}
