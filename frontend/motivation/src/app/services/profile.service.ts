import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profile } from '../models/profile';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  headers: any = {}
  currentUser: any;


  constructor(
    private http: HttpClient) { }

  profUrl: string = environment.URL;

  getHeaders(){
		let user: any = JSON.parse(localStorage.getItem("authToken") || '{}');

		if (user) {
			if (user.access && user.refresh) {
				return new HttpHeaders({
					'Content-Type': 'application/json',
					'Authorization': `JWT ${user.access}`
				});
			}

			return new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': `token ${user.token}`
			});
		}
	}



  getCurrentUser(){
    return this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

  }


	getUser():Observable<any[]>{

    var reqHeader = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http.get<Profile[]>(this.profUrl + 'profile',{headers: reqHeader})

	}




	updateUser(user: any){
    return this.http.put<any[]>(this.profUrl + 'user', user )
		// return this.http.put(`${this.profUrl}/user/`, user, { headers: this.getHeaders() })

	}

	updateProfile(profile: any){
		return this.http.put(`${this.profUrl}/profile`, profile)
    // return this.http.put<any[]>(this.profUrl + 'profile', profile , { headers: this.getHeaders() })

	}

	removeUserProfile(){
		return this.http.delete(`${this.profUrl}/profile`, { headers: this.getHeaders() })
	}

	passwordReset(email: any){
		return this.http.post(`${this.profUrl}/password-reset/`, email )
	}

	passwordConfirm(email_token: any){
		return this.http.post(`${this.profUrl}/password-reset/confirm/`, email_token )
	}

	getAllUsers():Observable<any>{
		return this.http.get<any>(this.profUrl + 'users', {headers: this.getHeaders()})
	}

}
