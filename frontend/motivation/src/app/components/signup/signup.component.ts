import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { BackupService } from 'src/app/services/backup.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  register:any;
  error: any;
  private loggedIn = new BehaviorSubject<boolean>(false);
  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(
    private RegisterService: AuthenticationService,
    private authBackup: BackupService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.register = {
      username: '',
      email: '',
      password: '',
      // password2: '',
    };
  }
  registerUser(){
    this.authBackup.signUp(this.register).subscribe( response => {
      // console.log(response)
      alert('User ' + this.register.username + ' has been created'),
      this.loggedIn.next(true);
      this.router.navigate(['login'])
    },
    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }
}
