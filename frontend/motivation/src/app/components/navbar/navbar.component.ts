import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackupService } from 'src/app/services/backup.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { ProfileService } from 'src/app/services/profile.service';
import { first } from 'rxjs/operators';
import { StudentUser } from 'src/app/models/student-user';


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
  currentUser!:StudentUser;
  loading = false;


  // motivationModel = new Motivation('','', '', 'Category': category_name,'','1', '2021-10-14')

  public new_motivation: any;
  newCat: any;
  file: any;

  constructor(
    private authService: AuthenticationService,
    private authBackup: BackupService,
    private profService: ProfileService,
    private motivationService: MotivationService,
    private router: Router,

    )
    { }

  ngOnInit(): void {


    this.user = {
      username: '',
      password: ''
    };

    this.motivationPost = {};






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



  this.authBackup.getCurrentUser().pipe(first()).subscribe((loggedUser: StudentUser) => {
    this.currentUser = loggedUser;
    // console.log(loggedUser)
  });

  }

  onFileSelected(e:any) {
    this.file = e.target.files[0];

  }


  publishMotivation(){
    console.log(this.motivationPost)
    this.loading = true;
    this.motivationService.postMotivation(this.motivationPost, this.file).subscribe( response => {
      console.log(response)


      alert('Motivation ' + this.motivationPost.username + ' has been created'),
      // this.loggedIn.next(true);
      this.router.navigate(['home'])

    },

    error => {
      this.error = error
      this.loading = true;
      console.log('error',error)
    }
    );
  }


  isLogout(){
    this.authBackup.Logout();

  }

  refresh(): void {
    window.location.reload();
}








}
