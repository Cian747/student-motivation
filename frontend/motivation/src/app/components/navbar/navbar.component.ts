import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/models/category';
import { Motivation } from 'src/app/models/motivation';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BackupService } from 'src/app/services/backup.service';
import { MotivationService } from 'src/app/services/motivation.service';
import { ProfileService } from 'src/app/services/profile.service';
import { first } from 'rxjs/operators';
import { StudentUser } from 'src/app/models/student-user';
// import { FileUploader, FileUploaderOptions, ParsedResponseHeaders } from 'ng2-file-upload';
// import { Cloudinary } from '@cloudinary/angular-5.x';



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

  public new_motivation: any;
  newCat: any;
  file: any;
  filePath: any;
  image!: File;
  video!: File;
  title!: string;
  description!: string;
  category!: any;



  constructor(
    private authService: AuthenticationService,
    private authBackup: BackupService,
    private profService: ProfileService,
    private motivationService: MotivationService,
    private router: Router,
    // private cloudinary: Cloudinary,
    // private zone: NgZone,
    // private hasBaseDropZoneOver: boolean = false;

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


  public handleUpload(e:any) {
    this.filePath = e.target.value; }


  handleUpload1(event: any) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: ProgressEvent) => {
        this.filePath = (<FileReader>event.target).result;
      }

      reader.readAsDataURL(event.target.files[0]);
    }
  }



  titleChange(event:any){
    this.title = event.target.value;

   }

   descriptionChange(event:any){
    this.description = event.target.value;
    console.log(this.description)


   }


 imageUpload(event:any){
   this.image = event.target.files[0];

  }

  videoUpload(event:any){
    this.video = event.target.files[0];

   }

   categoryChange(event:any){
    this.category = event.target.value;

   }



  publishMotivation(){

    const uploadData = new FormData()
    uploadData.append('title', this.title)
    uploadData.append('description', this.description)
    uploadData.append('image', this.image)
    // uploadData.append('video', this.video)
    uploadData.append('category', this.category)

    this.motivationService.postMotivation(uploadData).subscribe( response => {
    console.log(response)
      alert('Motivation ' + this.motivationPost.username + ' has been created'),
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


