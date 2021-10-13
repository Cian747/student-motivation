import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { BackupService } from '../services/backup.service';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(public auth: AuthenticationService, public authBackup : BackupService) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

  //   request = request.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.auth.getToken()}`
  //     }
  //   });
  //   return next.handle(request);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const authToken = this.authBackup.getToken();
    req = req.clone({
        setHeaders: {
            Authorization: "Bearer " + authToken
        }
    });
    return next.handle(req);
}

  // intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   // add authorization header with jwt token if available
  //   let currentUser = this.auth.currentUserValue;
  //   if (currentUser && currentUser.token ) {
  //       request = request.clone({
  //           setHeaders: {
  //               Authorization: `Bearer ${currentUser.token}`
  //           }
  //       });
  //   }

    // return next.handle(request);
// }
}

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: InterceptorInterceptor, multi: true }
];
