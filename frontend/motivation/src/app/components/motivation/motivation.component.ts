import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { environment } from 'src/environments/environment';
import { TruncateModule } from 'ng2-truncate';


@Component({
  selector: 'app-motivation',
  templateUrl: './motivation.component.html',
  styleUrls: ['./motivation.component.css']
})



export class MotivationComponent implements OnInit {


  motivations!:Motivation[]
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
        this.motivations = response;
        resolve()
      },
      (error:string) => {

      })

    })

    // let baseUrl = environment.mediaURL;

    // let promise = new Promise <void> ((resolve,reject)=>{
    //   this.motivationService.getAllMotivations().toPromise().then(
    //     (response) => {
    //     let new_response = response.map(item => {
    //       let new_image = `${baseUrl}${item["image"]}`
    //       item["image"] = new_image
    //       return item

    //     })
    //     console.log(new_response)
    //     this.motivations = response;

    //     resolve()
    //   },
    //   (error:string) => {

    //   })
    // })
    // return this.motivations


  }


  goToUrl(id: any){
    this.router.navigate(['/motivation',id])
  }


  copyUrl(){
    alert("Motivation link has been copied. Share with your friends!")
  }





}





