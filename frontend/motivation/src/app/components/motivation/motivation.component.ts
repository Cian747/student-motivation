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
  wishlist:any;


  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
    private authService: AuthenticationService,
    private wishlistService: MotivationService,
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
        // console.log(response)
        resolve()
      },
      (error:string) => {

      })

    })
  }



  addWishlist(id: any){
    console.log(this.wishlist)
    this.motivationService.addToWishlist(this.wishlist, id).subscribe( response => {
      // console.log(response)


      alert('This motivation post has been added to wishlist'),
      this.router.navigate(['home'])

    },

    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }


  goToUrl(id: any){
    this.router.navigate(['/motivation',id])
  }


  copyUrl(){
    alert("Motivation link has been copied. Share with your friends!")
  }


}





