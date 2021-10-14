import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';
import { StudentUser } from 'src/app/models/student-user';
import { BackupService } from 'src/app/services/backup.service';
import { ProfileService } from 'src/app/services/profile.service';

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


  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private authBackup: BackupService,
    private router: Router,

  )

  { }

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
