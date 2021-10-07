import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotivationService } from 'src/app/services/motivation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  motivations!:Motivation[]


  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
    private authService: AuthenticationService

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


  }

  onLogout(){
    this.authService.logout();
  }

}
