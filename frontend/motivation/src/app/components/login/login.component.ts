import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { first } from 'rxjs/operators';
import { StudentUser } from 'src/app/models/student-user';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackupService } from 'src/app/services/backup.service';
import { ProfileService } from 'src/app/services/profile.service';

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

  private currentUserSubject: BehaviorSubject<StudentUser>;
  public currentUser: Observable<StudentUser>;

  signinForm!: FormGroup;


  constructor(
    private LoginService: AuthenticationService,
    private profile: ProfileService,
    private auth: BackupService,
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
    this.LoginService.loginUser(this.login).subscribe( (response:any)=> {
      localStorage.setItem('authToken', JSON.stringify(response.Token));
      console.log(response.Token)

      this.loggedIn.next(true);

      this.router.navigate(['home'])
      // localStorage.setItem('currentUser', JSON.stringify(response));
      // this.currentUserSubject.next(response);
      // return response;
    },
    error => {
      alert('Invalid User Credentials');
      console.log('error',error)
    }
    );
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





   loginUser() {
    this.auth.signIn(this.signinForm.value)
    this.loading = true;

  }





}


