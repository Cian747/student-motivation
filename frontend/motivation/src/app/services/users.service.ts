import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  usersUrl = environment.URL
   // http options used for making API calls
   private httpOptions: any;
   // the actual JWT token
  public token: any;
  // error messages received from the login attempt
  constructor(private http:HttpClient) {
   }
  getUsers(){
   return this.http.get(this.usersUrl + 'users')
  }
  ChangeAdmin(id:any, data:any){
    return this.http.put(this.usersUrl+ `superuser/${id}`, data)
  }
  deactivateUser(id:any, data:any){
    return this.http.put(this.usersUrl + `remove_user/${id}`, data)
  }
}
