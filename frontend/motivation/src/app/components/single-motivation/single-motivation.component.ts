import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motivation } from 'src/app/models/motivation';
import { MotivationService } from 'src/app/services/motivation.service';
import { ReviewService } from 'src/app/services/review.service';

@Component({
  selector: 'app-single-motivation',
  templateUrl: './single-motivation.component.html',
  styleUrls: ['./single-motivation.component.css']
})
export class SingleMotivationComponent implements OnInit {


  motivations!:Motivation[]
  error: any;
  motivation!:any;
  reviewPost:any;
  reviews: any;




  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
    private reviewService: ReviewService,
    private route:ActivatedRoute,
    private router: Router,

  )

  { }

  ngOnInit(){

    this.reviewPost = {};


    let id = this.route.snapshot.paramMap.get('id');

    let promise = new Promise <void> ((resolve,reject)=>{
      this.motivationService.getSingleMotivation(id).toPromise().then(
        (response:any) => {
          console.log(response)
        this.motivation = response;
        resolve()
      },

      (error:string) => {

      })
          // Reviews
      this.reviewService.getAllMotivationReviews(id).toPromise().then(
        (response:any) => {
        this.reviews = response;
        // console.log(response)

        resolve()
      },
      (error:string) => {

      })
    })



    // Jquery
     $('#add-review').on('click', function () {
       $("#review-form").fadeIn(1000);
       $("#add-review").hide();
       $("#hide-form").fadeIn(1000);



    });
    $('#hide-form').on('click', function () {
      $("#review-form").hide();
      $("#add-review").fadeIn(1000)
      $("#hide-form").hide();



   });

    $("add-review").on('click' ,function() {
      window.location.hash = "review-list"+$(this).attr("id");
    });

  //   $("#add-review").on('click' ,function() {
  //     $('html, body').animate({
  //         scrollTo: $("#review-list")
  //     }, 2000);
  // });





  }

  toForm(){
    document.getElementById("review-list")?.scrollIntoView({behavior:'smooth', block:'start'});
  }


  postReview(id:any){
    console.log(this.reviewPost)
    this.reviewService.postReview(this.reviewPost, id).subscribe( response => {
      // console.log(response)
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




}
