import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery'

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
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

