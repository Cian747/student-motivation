import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';
import { StudentUser } from 'src/app/models/student-user';
import { BackupService } from 'src/app/services/backup.service';
import { ProfileService } from 'src/app/services/profile.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { updateLocale } from 'moment';

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
  file!:File
  phone_number!:any;
  address!: string;
  email!:string;


  onEmailChange(event:any){
    this.email = event.target.value
  }
  onImageChange(event:any){
    this.file = event.target.files[0]
  }
  onAddresschange(event: any){
    this.address = event.target.value
  }
  onPhoneChange(event :any){
    this.phone_number = event.target.value
  }


  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private authBackup: BackupService,
    private router: Router,
    private authService:AuthenticationService

  )

  { }
  profileUpdate(){
    
    this.profileService.profileUpdate(this.profile).subscribe(data=>{
      console.log(data)
    })
  }
  

  // updateProfile(){
  //   const profileData = new FormData();
  //   profileData.append('email', this.email)
  //   profileData.append('file', this.file)
  //   profileData.append('phone', this.phone_number)
  //   profileData.append('address', this.address)

  //   this.profileService.profileUpdate(profileData).subscribe(data=>{
  //     console.log(data)
  //   })
  // }


  ngOnInit(){
    this.loading = true;
    this.authBackup.getUserProfile().pipe(first()).subscribe(user => {
        this.loading = false;
        this.profile = user;
        console.log(user)
    });     
    
    this.authBackup.getCurrentUser().pipe(first()).subscribe((loggedUser: StudentUser) => {
      this.currentUser = loggedUser;
      console.log(loggedUser)
    });



    this.authBackup.updateProfile().subscribe((profile_res: any) => {
      this.loading = true;

    }, (error: any)=> {
      this.loading = false;

      console.log(error);
    })
  }


}
