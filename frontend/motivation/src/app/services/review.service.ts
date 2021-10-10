import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  readonly APIUrl = environment.URL;

  constructor(private http: HttpClient) {

  }

  getAllMotivationReviews(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + `rev?motivation=${id}`)
  }


  getSingleReview(id:any):Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl + `review/review-id/${id}/`)
  }




  postReview(reviewData:any):Observable<any[]>{
    return this.http.post<any[]>(this.APIUrl + 'review/', reviewData)
  }

}
