import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

 public login:any;
  error: any;
  public token: any
  public errors: any = [];
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private LoginService: AuthenticationService,
    private router: Router,
    
  ) {
   
   }

  ngOnInit(): void {
    this.login = {
      username: '',
      password: '',
      email: '',
      role:'',


    };
  }

  LoginUser(){
    this.LoginService.signIn(this.login)
  }
  // LoginUser(){
  //   this.LoginService.signIn(this.login).subscribe(response => {
  //     // alert('User ' + this.login.username + ' has logged in'),
  //     this.loggedIn.next(true);
  //     // if this.login.role ==
  //     this.router.navigate(['home'])
  //   },
  //   error => {
  //     alert('Invalid User Credentials');
  //     console.log('error',error)
  //   }
  //   );
  //   this.login.reset();
  // }

// login() {
//   this.LoginService.login({'username': this.user.username, 'password': this.user.password});
// }
// }




}


