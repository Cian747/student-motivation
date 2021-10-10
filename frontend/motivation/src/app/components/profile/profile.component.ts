import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Profile } from 'src/app/models/profile';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profile!:any;
  error: any;


  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private router: Router,

  )

  { }

  ngOnInit(){
    let promise = new Promise <void> ((resolve,reject)=>{
      this.profileService.getUser().toPromise().then(
        (response:any) => {
          console.log(response)
        this.profile = response;
        resolve()
      },
      (error:string) => {

      })
    })

  }


}
