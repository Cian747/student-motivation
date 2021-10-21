import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';
import { StudentUser } from 'src/app/models/student-user';
import { BackupService } from 'src/app/services/backup.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {


  profile!:Profile;
  error: any;
  currentUser!:StudentUser;
  loading = false;
  categories:any;
  update:any;
  profile_photo!: File;
  phone_number!: string;
  profUpdate:any;


  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private authBackup: BackupService,
    private router: Router,
    private authService:AuthenticationService,
    private motivationService: MotivationService

  )

  {
   }

  ngOnInit(){
    this.loading = true;


    this.authBackup.getUserProfile().pipe(first()).subscribe(user => {
        this.loading = false;
        this.profile = user;
        // console.log(user)
    });


    this.authBackup.getCurrentUser().pipe(first()).subscribe((loggedUser: StudentUser) => {
      this.currentUser = loggedUser;
      // console.log(loggedUser)
    });


    let promise = new Promise <void> ((resolve,reject)=>{
      this.motivationService.getAllCategories().toPromise().then(
        (response:any) => {
          console.log(response)
        this.categories = response;
        resolve()
      },
      (error:string) => {

      })


    })



  }

  edit = new FormGroup({
    phone_number: new FormControl(''),
    profile_photo: new FormControl(''),
   })


  phoneChange(event:any){
    this.phone_number = event.target.value;
    console.log(this.phone_number)

   }


  profile_photoChange(event:any){
    this.profile_photo = event.target.value[0];
    console.log(this.profile_photo)


   }

  profileUpdate(){
    const uploadData = new FormData()
    // uploadData.append('phone_number', this.phone_number)
    uploadData.append('profile_photo', this.profile_photo)
    uploadData.append('phone_number', this.profile.phone_number)
    this.authBackup.updateProfile(this.profile).subscribe(data => {
      alert("Profile updated successfully")
      window.location.reload();


      // console.log(data)

    }, (error: any)=> {

      console.log(error);
    })


  }

  userUpdate(){
    this.authBackup.updateUser(this.currentUser).subscribe(data => {
        console.log(this.currentUser)
    }, (error: any)=> {
      this.loading = false;

      console.log(error);
    })
  }

  refresh(): void {
    window.location.reload();
}




}
