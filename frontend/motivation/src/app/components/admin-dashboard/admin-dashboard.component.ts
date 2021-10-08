import { HttpClient } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'
import { MotivationService } from 'src/app/services/motivation.service';
import { Motivation } from 'src/app/models/motivation';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(private http:HttpClient, private motivationService:MotivationService) { }
  motivations!:Motivation[]

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
}

