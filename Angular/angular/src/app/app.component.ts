import { Route, Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular';
  constructor(private route: Router) { }

  isLoggingPage(): boolean {
    return this.route.url === "/login";
  }
  isRegisterPage(): boolean {
    return this.route.url === "/register";
  }
}
