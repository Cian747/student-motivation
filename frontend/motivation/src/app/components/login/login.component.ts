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

  login:any;
  error = '';
  loginForm!: FormGroup;
  loading = false;
  submitted = false;


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
    private fb: FormBuilder,
  ) {
    this.currentUserSubject = new BehaviorSubject<StudentUser>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();

    this.signinForm = this.fb.group({
      username: [''],
      password: ['']
    })

   }

  ngOnInit(): void {
    this.login = {
      username: '',
      password: '',
      email: '',
      role:'',

    };


}



  // LoginUser(){
  //   this.LoginService.loginUser(this.login).subscribe( (response:any)=> {
  //     localStorage.setItem('authToken', JSON.stringify(response.Token));
  //     console.log(response.Token)

  //     this.loggedIn.next(true);

  //     this.router.navigate(['home'])
  //     // localStorage.setItem('currentUser', JSON.stringify(response));
  //     // this.currentUserSubject.next(response);
  //     // return response;
  //   },
  //   error => {
  //     alert('Invalid User Credentials');
  //     console.log('error',error)
  //   }
  //   );
  // }



   loginUser() {
    this.auth.signIn(this.signinForm.value)


  }





}
