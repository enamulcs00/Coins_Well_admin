import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { NotificationsService } from '../_services/notifications.service';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private _noti: NotificationsService, private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            tap((data: any) => {
                if (data.body && data.body.code == 400) {
                    this._noti.show("error", data.body.message, "Error!");
                    return Observable.throw(data.body.message);
                } else {
                    return data.body;
                }
            }),
            catchError(err => {
                if (err.status === 401) {
                    this._noti.show("error", "Not authorized", "Error!");
                    localStorage.clear();
                    this.router.navigate(['/login']);
                }
                else {
                    var error = err.error.error_description || err.error.message || err.statusText || err.message;
                    this._noti.show('error', error, "Error!")
                }
                var error = err.error.error_description || err.error.message || err.statusText || err.message;
                return throwError(error);
            }));
    }
}
