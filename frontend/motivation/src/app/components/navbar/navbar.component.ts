import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackupService } from 'src/app/services/backup.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  motivationPost:any;
  categories:any;
  logout:any;
  error: any;
  user:any;

  // motivationModel = new Motivation('','', '', 'Category': category_name,'','1', '2021-10-14')


  constructor(
    private authService: AuthenticationService,
    private authBackup: BackupService,
    private profService: ProfileService,
    private motivationService: MotivationService,
    private router: Router,

    )
    { }

  ngOnInit(): void {
    this.motivationPost = {
      image: '',
      video: '',
      title: '',
      category: '1',
      description: '',
      profile:'1',
      created_at:'2021-10-14',

    };
    this.user = {
      username: '',
      password: ''
    };


    let promise = new Promise <void> ((resolve,reject)=>{
      this.motivationService.getAllCategories().toPromise().then(
        (response:any) => {
          // console.log(response)
        this.categories = response;
        resolve()
      },
      (error:string) => {

      })


    })


  }



  publishMotivation(){
    console.log(this.motivationPost)
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

  // logout

  // onLogout(){
  //   this.authService.logout();
  // }

  isLogout(){
    this.authBackup.Logout();

  }

  // current user
  currentProfile(){
    this.profService.currentUser()
  }


}
