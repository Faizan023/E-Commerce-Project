import { Injectable } from "@angular/core";
import { StorageKey } from "./comman-constant";

@Injectable({
    providedIn: 'root'
})
export class HelperService {


    get isLoggedIn(): boolean {
        let isLogin = localStorage.getItem(StorageKey.IsLoggedIn)
        if (isLogin != null) {
            return Boolean(isLogin);
        } else {
            return false
        }
    }
}