import { Injectable } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { CanActivate, Router } from '@angular/router';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap, shareReplay, catchError } from 'rxjs/operators';
import jwtDecode from 'jwt-decode';
import * as moment from 'moment';
import { Users } from '../models/users';
import { map } from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // private loggedIn = new BehaviorSubject<boolean>(false);

  // get isLoggedIn() {
  //   return this.loggedIn.asObservable();
  // }


	authUrl: string = environment.URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  currentUser = {}
  constructor(private http:HttpClient,  private router: Router) { }

  signUp(user:Users){
    let api = this.authUrl + 'register'
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

  // loginUser(loginData:any):Observable<any[]>{
  //   return this.http.post<any[]>(this.authUrl + 'login',loginData)
  // }


  // logout() {
  //   this.loggedIn.next(false);
  //   this.router.navigate(['/landing']);
  // }







}
