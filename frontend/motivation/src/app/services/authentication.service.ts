import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, shareReplay, catchError } from 'rxjs/operators';
// import { JwtHelperService } from '@auth0/angular-jwt';
import * as moment from 'moment';
import { Users } from '../models/users';
import { map } from 'jquery';

import { StudentUser } from '../models/student-user';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
   private loggedIn = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }

  //private currentUserSubject: BehaviorSubject<StudentUser>;
  // public currentUser: Observable<StudentUser>;


	authUrl: string = environment.URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json') 
  currentUser = {}
  constructor(private http:HttpClient,  private router: Router) { }

  signUp(user:Users){
    let api = this.authUrl + 'register'
    // let reqHeaders = new HttpHeaders({"No-Auth":'True'})
  
    return this.http.post(api, user)

  }
  signIn(user:Users){
    return this.http.post<any>(this.authUrl + 'token/obtain/', user)
      .subscribe((res)=>{
        console.log(res)
        console.log(res.access)
        localStorage.setItem('access', res.access)
        this.getUserProfile().subscribe((res)=>{
          this.currentUser = res
        
        })
      this.router.navigate(['home'])
       })
       
  }

  getToken(){
    return localStorage.getItem('access')
  }

get isLoggedIn():boolean{
  let authToken  = localStorage.getItem('access')
  return (authToken != null) ?true: false
}

logout(){
  let removeToken = localStorage.removeItem('access')
  if (removeToken == null){
    this.router.navigate(['login'])
   }
  }

// logout(){
//   localStorage.removeItem('access')
//   this.router.navigate(['login'])
// }
  


getUserProfile():Observable<any>{
  let api = this.authUrl+ 'profile/'
  return this.http.get(api, {headers: this.headers})

}
handleError(error: HttpErrorResponse){
  let msg= ''
  if (error.error instanceof ErrorEvent){
    msg = error.error.message
  }else{
    msg = `Error code ${error.status} message: ${error.message}`
  }
  return throwError(msg)

}


















  
  


 
// private httpOptions :any

  // registerUser(regData:any){
  //   return this.http.post(this.authUrl + 'register',regData)
  // }

  loginUser(loginData:any):Observable<any[]>{
    return this.http.post<any[]>(this.authUrl + 'login',loginData)
  }


  // logout() {
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/landing']);
  // }

//   public get currentUserValue():StudentUser {
//     return this.currentUserSubject.value;
// }
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


  // login(username: string, password: string) {
  //   return this.http.post<any>(`${this.authUrl}token/obtain/`, { username, password })
        // .pipe(map(user => {
        //     // store user details and jwt token in local storage to keep user logged in between page refreshes
        //     localStorage.setItem('currentUser', JSON.stringify(user));
        //     this.currentUserSubject.next(user);
        //     return user;
        // }));


// login(credentials:any): Observable<any> {
//   return this.http.post(this.authUrl + 'token/obtain/', {
//     username: credentials.username,
//     password: credentials.password
//   }, httpOptions);
// }


  // loginUser(user: any){
	// 	let authUser = {
	// 		"username": user.username,
	// 		"password": user.password
	// 	}

	// 	// if (user.jwt) {
	// 		return this.http.post(`${this.authUrl}token/obtain/`, authUser )
	// 	// }

	// 	// return this.http.post(`${this.authUrl}login`, authUser )
	// }

  // logout(){
  //     // remove user from local storage to log user out
  //     // localStorage.removeItem('currentUser');

  //     // this.currentUserSubject.next();
  //   localStorage.removeItem('authToken');
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/landing']);

  // }


}
