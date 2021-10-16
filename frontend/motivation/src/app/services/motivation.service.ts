import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MotivationComponent } from '../components/motivation/motivation.component';

@Injectable({
  providedIn: 'root'
})
export class MotivationService {

  readonly APIUrl = environment.URL;

  constructor(private http: HttpClient) {

  }

  getAllMotivations():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'motivation/')
  }


  getSingleMotivation(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + `motivation/mot-id/${id}`)
  }

  filterByCategory(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + `motivation/mot-cat/${id}`)
  }




  postMotivation(motivationData:any, file:any){
    const body = new FormData();
    body.append('id', motivationData);
    body.append('files', file, file.name);
    return this.http.post<any[]>(this.APIUrl + 'motivation/', motivationData )
  }

  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'category/')

  }

  searchMotivation(service:string):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + 'api/search/?search='+ service )
  }

}
