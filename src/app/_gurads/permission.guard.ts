import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { environment } from 'src/environments/environment';
import { NotificationsService } from '../_services/notifications.service';
import { CommonService } from '../_services/common.service';
import { urls } from '../_services/urls';
@Injectable({
    providedIn: 'root'
})
export class PermissionGuard implements CanActivate {
    constructor(private router: Router, private _noti : NotificationsService, private _comon : CommonService) { }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Promise<boolean> {
        return new Promise(async (resolve) => {
            if(!this._comon.latestUserInfo) {
                this._comon.get(urls.getProfile).subscribe(perm => {
                    this._comon.latestUserInfo = perm.data;
                    const roles = route.data;
                     if(this._comon.checkPermissionRealData(roles.permission,roles.type)) {
                        resolve(true);
                    } else {
                        resolve(false)
                        this.router.navigate(['/myprofile']);
                        this._noti.show("error", "You don't have the permission to access that page.", "Login")
                    }
                })
            } else {
                const roles = route.data;
                if(this._comon.checkPermissionRealData(roles.permission,roles.type)) {
                    resolve(true);
                } else {
                    resolve(false)
                    this.router.navigate(['/myprofile']);
                    this._noti.show("error", "You don't have the permission to access that page.", "Login")
                }
            }
        })
    }
}
