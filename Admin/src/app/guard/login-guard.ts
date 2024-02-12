
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { StorageKey } from '../helper/comman-constant';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '../service/service.service';

// export const AuthGuardFunction: CanActivateFn = (
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot
// ) => {
//     let isLoggedIn = localStorage.getItem(StorageKey.IsLoggedIn);

//     if (isLoggedIn != null) {
//         return Boolean(isLoggedIn);
//     } else {
//         return false;
//     }
// }
@Injectable({ providedIn: 'root' })
export class LoginGuardService {
    constructor(private auth: AuthService, private route: Router) { }

    CanActivate() {
        var token = this.auth.getToken();
        var isExpired = token ? !this.auth.IsTokenExpired(token) : this.route.navigateByUrl('/login');
        if (isExpired) {
            return true;
        } else {
            this.route.navigateByUrl('/login');
            return false
        }
    }
}
export const tokenService: CanActivateFn = (route, state) => {
    return inject(LoginGuardService).CanActivate();
  }
