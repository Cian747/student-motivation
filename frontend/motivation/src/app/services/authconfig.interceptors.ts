import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { AuthenticationService } from "./authentication.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthenticationService, private router:Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if(req.headers.get("No-Auth") == "True"){
            return next.handle(req.clone())
        }
        
            const authToken = this.authService.getToken();
        req = req.clone({
            setHeaders: {
                Authorization: "Bearer " + authToken
            }
        });
        return next.handle(req);
              
        
    }
}