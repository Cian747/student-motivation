import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, shareReplay, map } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { StudentUser } from '../models/student-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  private currentUserSubject: BehaviorSubject<StudentUser>;
  public currentUser: Observable<StudentUser>;


	authUrl: string = environment.URL;


  constructor(private http:HttpClient,  private router: Router,) {
    this.currentUserSubject = new BehaviorSubject<StudentUser>(
      JSON.parse(localStorage.getItem('currentUser')  || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }




  public getToken(): string {
    return localStorage.getItem('authToken') || '{}';


  }

  public get currentUserValue():StudentUser {
    return this.currentUserSubject.value;
}
  // public isAuthenticated(): boolean {
  //   // get the token
  //   const token = this.getToken();
  //   // return a boolean reflecting
  //   // whether or not the token is expired
  //   return tokenNotExpired('id_token');

  // }









  registerUser(regData: any){
		return this.http.post(`${this.authUrl}register`, regData)
	}


  login(username: string, password: string) {
    return this.http.post<any>(`${this.authUrl}token/obtain/`, { username, password })
        .pipe(map(user => {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
            return user;
        }));
}

// login(credentials:any): Observable<any> {
//   return this.http.post(this.authUrl + 'token/obtain/', {
//     username: credentials.username,
//     password: credentials.password
//   }, httpOptions);
// }


  loginUser(user: any){
		let authUser = {
			"username": user.username,
			"password": user.password
		}

		// if (user.jwt) {
			return this.http.post(`${this.authUrl}token/obtain/`, authUser )
		// }

		// return this.http.post(`${this.authUrl}login`, authUser )
	}

  logout() {
      // remove user from local storage to log user out
      // localStorage.removeItem('currentUser');

      // this.currentUserSubject.next();
    localStorage.removeItem('authToken');
    this.loggedIn.next(false);
    this.router.navigate(['/landing']);

  }


}
