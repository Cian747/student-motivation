import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  motivationPost:any
  error: any;

  constructor(
    private authService: AuthenticationService,
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
      category: '',
      description: '',




    };

  }

  publishMotivation(){
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

  onLogout(){
    this.authService.logout();
  }

  // current user
  currentProfile(){
    this.profService.currentUser()
  }


}
