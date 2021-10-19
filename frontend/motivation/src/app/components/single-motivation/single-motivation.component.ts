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
<<<<<<< HEAD
=======
  thread:any;
  hideme!: {};
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76




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
<<<<<<< HEAD
=======
          // console.log(response)
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
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
<<<<<<< HEAD
=======


>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
    })



    // Jquery
     $('#add-review').on('click', function () {
       $("#review-form").fadeIn(1000);
       $("#add-review").hide();
       $("#hide-form").fadeIn(1000);

<<<<<<< HEAD


    });
=======
    });

>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
    $('#hide-form').on('click', function () {
      $("#review-form").hide();
      $("#add-review").fadeIn(1000)
      $("#hide-form").hide();
<<<<<<< HEAD



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

=======
    });


    $("add-review").on('click' ,function() {
      window.location.hash = "review-list"+$(this).attr("id");

    $('#show-thread-form').on('click', function () {
      $("#thread-form").fadeIn(1000);
      $("#review-threads").hide();

   });



   });

  }
  
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
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
<<<<<<< HEAD
=======
      // console.log('error',error)
    }
    );
  }

  showThread(id: any){
  this.reviewService.getReviewThread(id).toPromise().then(
    (response:any) => {
    this.thread = response;
    console.log(response)
  },
  (error:string) => {

  })
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
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
      console.log('error',error)
    }
    );
  }

  refresh(): void {
    window.location.reload();
<<<<<<< HEAD
}
=======
  }

  goToUrl(id: any){
    this.router.navigate(['/review',id])
  }

  togglePanel: any = {};

  show = -1;
  toggle (index:any) {

  this.show = index;
}
  isShowComment = true;
  isShowThread = true;


  toggleComment() {
    this.isShowComment = !this.isShowComment;
  }

  toggleThread(id:any) {
    this.isShowThread = !this.isShowThread;
  }



>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76




}
