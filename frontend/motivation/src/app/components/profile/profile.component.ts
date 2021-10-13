import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Profile } from 'src/app/models/profile';
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
  loading = false;


  constructor(
    private http: HttpClient,
    private profileService: ProfileService,
    private authBackup: BackupService,
    private router: Router,

  )

  { }

  ngOnInit(){
    // let promise = new Promise <void> ((resolve,reject)=>{
    //   this.profileService.getUser().toPromise().then(
    //     (response:any) => {
    //       console.log(response)
    //     this.profile = response;
    //     resolve()
    //   },
    //   (error:string) => {

    //   })
    // })

    this.loading = true;
    this.authBackup.getUserProfile().pipe(first()).subscribe(user => {
        this.loading = false;
        this.profile = user;
        console.log(user)
    });

  }


}
