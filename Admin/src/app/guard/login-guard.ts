
import { ActivatedRouteSnapshot, CanActivateFn, RouterStateSnapshot } from '@angular/router';
import { StorageKey } from '../helper/comman-constant';

export const AuthGuardFunction: CanActivateFn = (
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
    ) => {
        let isLoggedIn = localStorage.getItem(StorageKey.IsLoggedIn);

        if(isLoggedIn != null){
            return Boolean(isLoggedIn);
        }else{
            return false;
        }
}
    