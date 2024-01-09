import { Route, Router } from '@angular/router';
import { HelperService } from './helper/helper.service';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Admin';


  constructor(private helperService: HelperService, private route: Router) {
  }
  // @ViewChild('sidebar') sidebar !: SidebarComponent;

  isLoginPage(): boolean {
    return this.route.url === "/login";
  }
}
