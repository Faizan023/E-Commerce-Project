import { CanActivateFn, Route, Router } from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { state } from '@angular/animations';

@Injectable({ providedIn: 'root' })
export class LoginGuardService {
  constructor(private auth: AuthService, private route: Router) { }

  CanActivate() {
    var token = this.auth.getToken();
    var isExpired = token ? !this.auth.isTokenExpired(token) : this.route.navigateByUrl("/login");
    if (isExpired) {
      return true
    } else {
      this.route.navigateByUrl("/login");
      return false
    }
  }

  // IsLoggedIn() {
  //   var token = localStorage.getItem('token');
  //   var isTokenExpired = token ? !this.auth.isTokenExpired(token) : true
  //   if (isTokenExpired) {
  //     this.route.navigateByUrl("/login");
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }
}

export const tokenService: CanActivateFn = (route, state) => {
  return inject(LoginGuardService).CanActivate();
}
// export const loggedinService: CanActivateFn = (route, state) => {
//   return inject(LoginGuardService).IsLoggedIn();
// }