import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReviewService } from 'src/app/services/review.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-thread',
  templateUrl: './review-thread.component.html',
  styleUrls: ['./review-thread.component.css']
})
export class ReviewThreadComponent implements OnInit {


  error: any;
  reviewPost:any;
  reviews: any;
  thread:any;
  review:any;




  constructor(
    private http: HttpClient,
    private reviewService: ReviewService,
    private route:ActivatedRoute,
    private router: Router,
    private location: Location,

  )

  { }

  ngOnInit(){

    this.reviewPost = {};


    let id = this.route.snapshot.paramMap.get('id');

    let promise = new Promise <void> ((resolve,reject)=>{
      this.reviewService.getSingleReview(id).toPromise().then(
        (response:any) => {
          // console.log(response)
        this.review = response;
        resolve()
      },

      (error:string) => {

      })
      this.reviewService.getReviewThread(id).toPromise().then(
        (response:any) => {
        this.thread = response;
        console.log(response)
      },
      (error:string) => {

      })

    })




    // Jquery
    $('#show-thread-form').on('click', function () {
      $("#thread-form").fadeIn(1000);
      $("#review-threads").hide();

   });



  }

  toForm(){
    document.getElementById("review-list")?.scrollIntoView({behavior:'smooth', block:'start'});
  }

  threadReview(id:any){
    console.log(this.reviewPost)
    this.reviewService.postReviewThread(this.reviewPost, id).subscribe( response => {
      console.log(response)
      // this.loggedIn.next(true);
      this.router.navigate([`motivation/${id}`])

    },

    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }

  refresh(): void {
    window.location.reload();
  }

  goToUrl(id: any){
    this.router.navigate(['/review',id])
  }

  goBack() {
    this.location.back(); // <-- go back to previous location on cancel
  }





}
