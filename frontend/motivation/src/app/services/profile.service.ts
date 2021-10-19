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

	profileUpdate(profile: any){
		return this.http.put(`${this.profUrl}profile/`, profile)
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




	// updateUser(user: any){
  //   return this.http.put<any[]>(this.profUrl + 'user', user , { headers: this.getHeaders() })
	// 	// return this.http.put(`${this.profUrl}/user/`, user, { headers: this.getHeaders() })

	// }

	// removeUserProfile(){
	// 	return this.http.delete(`${this.profUrl}/profile/`, { headers: this.getHeaders() })
	// }

	passwordReset(email: any){
		return this.http.post(`${this.profUrl}/password-reset/`, email )
	}

	passwordConfirm(email_token: any){
		return this.http.post(`${this.profUrl}/password-reset/confirm/`, email_token )
	}

	// getAllUsers():Observable<any>{
	// 	return this.http.get<any>(this.profUrl + 'users', {headers: this.getHeaders()})
	// }

}
