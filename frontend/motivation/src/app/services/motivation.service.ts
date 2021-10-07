import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MotivationService {

  readonly APIUrl = environment.URL;

  constructor(private http: HttpClient) {

  }

  getAllMotivations():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'api/motivation/')
  }

  postMotivation(motivationData:any):Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl + 'api/motivation/', motivationData)
  }

  searchMotivation(service:string):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'api/search/?search='+ service )
  }
}
