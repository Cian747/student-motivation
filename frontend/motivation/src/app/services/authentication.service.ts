import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, shareReplay } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }


	authUrl: string = environment.URL;


  constructor(private http:HttpClient,  private router: Router) {
  }




  registerUser(regData:any):Observable<any[]>{
    return this.http.post<any[]>(this.authUrl + 'register', regData)
  }

  loginUser(loginData:any):Observable<any[]>{
    return this.http.post<any[]>(this.authUrl + 'login', loginData)
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/landing']);
  }







}
