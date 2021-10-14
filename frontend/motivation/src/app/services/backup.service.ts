import { Injectable } from '@angular/core';
import { StudentUser } from '../models/student-user';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackupService {
	authUrl: string = environment.URL;
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }

  // Sign-up
  signUp(user: any): Observable<any> {
    let api = `${this.authUrl}register`;
    return this.http.post(api, user)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Sign-in
  signIn(user: StudentUser) {
    return this.http.post<any>(`${this.authUrl}token/obtain/`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access', res.access)
        // console.log(res.access)
          this.router.navigate(['home']);


      })
  }

  getToken() {
    return localStorage.getItem('access');
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access');
    return (authToken !== null) ? true : false;
  }

  Logout() {
    let removeToken = localStorage.removeItem('access');
    if (removeToken == null) {
      this.router.navigate(['landing']);
    }
  }

  // User profile
  getUserProfile():Observable<any>{
    let api = this.authUrl+ 'profile/'
    return this.http.get(api, {headers: this.headers})

  }


  // current user
  getCurrentUser():Observable<any>{
    let user = this.authUrl+ 'current_user'
    return this.http.get(user, {headers: this.headers})

  }

  // update profile
  updateProfile():Observable<any>{
    let api = this.authUrl+ 'profile/'
    return this.http.put(api, {headers: this.headers})

  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
