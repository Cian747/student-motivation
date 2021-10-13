import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  usersUrl = environment.URL

  constructor(private http:HttpClient) { }
  getHeaders(){
		let user: any = JSON.parse(localStorage.getItem("FULL_STACK_AUTH_COMP_USER") || '{}');

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

		return
	}

  getUsers():Observable<any[]>{
   return this.http.get<any>(this.usersUrl + 'users' , { headers: this.getHeaders() })
  }

  deleteUser():Observable<any>{
    return this.http.delete<any>(this.usersUrl + 'remove_user')
  }
}
