import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { Router } from '@angular/router';
import * as $ from 'jquery';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  motivations!:Motivation[]
  categories:any
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
      // motivations
      this.motivationService.getAllMotivations().toPromise().then(
        (response:any) => {
        // console.log(response)
        this.motivations = response;
        resolve()
      },
      (error:string) => {

      })
        // categories
      this.motivationService.getAllCategories().toPromise().then(
        (response:any) => {
          // console.log(response)
        this.categories = response;
        resolve()
      },
      (error:string) => {

      })
    })
    // return promise










  }

  goToCategory(id: any){
    this.router.navigate(['/category',id])
  }







}
