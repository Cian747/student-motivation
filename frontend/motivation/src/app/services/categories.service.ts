import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  url = environment.URL

  constructor(private http:HttpClient) { }

  getAllCategories():Observable<any[]>{
    return this.http.get<any[]>(this.url + 'category/')
  }

  addCategory(category:any):Observable<any>{
    return this.http.post<any>(this.url + 'category/', category)
  }

  getSingleCategory(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.url + `category/cat_idd/${id}`)
  }
}

