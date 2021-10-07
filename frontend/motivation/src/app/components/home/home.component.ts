import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  motivations!:Motivation[]
  motivationPost:any
  error: any;


  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
    private authService: AuthenticationService,
    private router: Router,

  )

  { }

  ngOnInit(){
    let promise = new Promise <void> ((resolve,reject)=>{
      this.motivationService.getAllMotivations().toPromise().then(
        (response:any) => {
          console.log(response)
        this.motivations = response;
        resolve()
      },
      (error:string) => {

      })
    })
    return promise



    this.motivationPost = {
      image: '',
      video: '',
      title: '',
      category: '',
      description: '',
      created: '',


    };

    // public image: string,
    // public video: string,
    // public title: string,
    // public category: string,
    // public description: string,
    // public profile:string,
    // public created:Date,
    // public update:Date,
    // public likes:string,


  }

  publishMotivation(){
    this.motivationService.postMotivation(this.motivationPost).subscribe( response => {
      console.log(response)
      alert('Motivation ' + this.motivationPost.username + ' has been created'),
      // this.loggedIn.next(true);
      this.router.navigate(['home'])

    },

    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }



}
