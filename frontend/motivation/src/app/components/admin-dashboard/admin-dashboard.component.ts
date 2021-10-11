import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { MotivationService } from 'src/app/services/motivation.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { Motivation } from 'src/app/models/motivation';
import { Category } from 'src/app/models/category';
import { Review } from 'src/app/models/review';
import { Users } from 'src/app/models/users';
import { UsersService } from 'src/app/services/users.service';
import { ReviewService } from 'src/app/services/review.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private http:HttpClient, private motivationService:MotivationService,
              private categoryService: CategoriesService,
               private user:UsersService,
               private review:ReviewService) { }


  motivations!:Motivation[]
  categories!:Category[]
  users!:Users[]
  reviews!:Review[]

  ngOnInit() {
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
  
  }
  
  get_users(){
    $('#dashbord-body').hide()
    $('#dashbord-categories').hide()
    $('#dashbord-posts').hide()
    $('#dashbord-admins').hide()
    $('#dashbord-student').show()
    this.user.getUsers().subscribe((response:any)=>{
      this.users = response
      console.log(response)
    })
  }
  get_posts(){
    $('#dashbord-body').hide()
    $('#dashbord-posts').show()
    $('#dashbord-categories').hide()
    $('#dashbord-student').hide()
    $('#dashbord-admins').hide()
    
    console.log('awadh')
  }
  get_categories(){
    $('#dashbord-body').hide()
    $('#dashbord-student').hide()
    $('#dashbord-posts').hide()
    $('#dashbord-admins').hide()
    $('#dashbord-categories').show()
    this.categoryService.getAllCategories().subscribe((response:any)=>{
        this.categories = response
        console.log(response)
      })
     
   
  }
  get_admin(){
    $('#dashbord-body').show()
    $('#dashbord-student').hide()
    $('#dashbord-posts').hide()
    $('#dashbord-categories').hide()
    $('#dashbord-admins').hide()
    

  }
  get_adm(){
    $('#dashbord-body').hide()
    $('#dashbord-student').hide()
    $('#dashbord-posts').hide()
    $('#dashbord-categories').hide()
    $('#dashbord-admins').show()
  }
  deletePost(post:any){
    this.motivations.splice(post,1)
  

  }
  getReview(id:any){
    this.review.getSingleReview(id)
    .subscribe(response=>{
      this.reviews = response
      
    })
    
  }
}

