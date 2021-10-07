import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private profService: ProfileService
    )
    { }

  ngOnInit(): void {
  }

  onLogout(){
    this.authService.logout();
  }

  currentProfile(){
    this.profService.currentUser()
  }


}
