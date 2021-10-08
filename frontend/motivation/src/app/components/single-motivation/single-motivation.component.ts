import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motivation } from 'src/app/models/motivation';
import { MotivationService } from 'src/app/services/motivation.service';

@Component({
  selector: 'app-single-motivation',
  templateUrl: './single-motivation.component.html',
  styleUrls: ['./single-motivation.component.css']
})
export class SingleMotivationComponent implements OnInit {


  motivations!:Motivation[]
  error: any;
  motivation!:any;



  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
    private route:ActivatedRoute,
  )

  { }

  ngOnInit(){
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
    })




  }




}
