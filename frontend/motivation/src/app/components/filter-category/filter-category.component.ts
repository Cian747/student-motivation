import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
<<<<<<< HEAD
import { Motivation } from 'src/app/models/motivation';
=======
import { first } from 'rxjs/operators';
import { Category } from 'src/app/models/category';
import { Motivation } from 'src/app/models/motivation';
import { StudentUser } from 'src/app/models/student-user';
import { Subscription } from 'src/app/models/subscription';
import { BackupService } from 'src/app/services/backup.service';
import { CategoriesService } from 'src/app/services/categories.service';
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
import { MotivationService } from 'src/app/services/motivation.service';

@Component({
  selector: 'app-filter-category',
  templateUrl: './filter-category.component.html',
  styleUrls: ['./filter-category.component.css']
})
export class FilterCategoryComponent implements OnInit {

  motivations!:Motivation[];
  // motivations!: any;

  categories:any;
  error: any;
<<<<<<< HEAD
=======
  subscription: any;
  wishlist:any;
  category:any;
  currentUser!:StudentUser;

>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76


  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
<<<<<<< HEAD
=======
    private categoryService: CategoriesService,
    private authBackup: BackupService,
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
    private route:ActivatedRoute,
    private router: Router,


  )

  { }

  ngOnInit(){
    let id = this.route.snapshot.paramMap.get('id');
    let promise = new Promise <void> ((resolve,reject)=>{
      // motivations
      this.motivationService.filterByCategory(id).toPromise().then(
        (response:any) => {
        this.motivations = response;
        resolve()
      },
      (error:string) => {

      })
<<<<<<< HEAD
=======

      this.categoryService.getSingleCategory(id).toPromise().then(
        (response:any) => {
          // console.log(response)
        this.category = response;
        resolve()
      },

      (error:string) => {

      })

>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
        // categories
      this.motivationService.getAllCategories().toPromise().then(
        (response:any) => {
        this.categories = response;
        resolve()
      },
      (error:string) => {

      })
<<<<<<< HEAD
    })
    // return promise
  }

=======
      this.authBackup.getCurrentUser().pipe(first()).subscribe((loggedUser: StudentUser) => {
        this.currentUser = loggedUser;
        // console.log(loggedUser)
      });


    })
  }

  addWishlist(id: any){
    this.motivationService.addToWishlist(this.wishlist, id).subscribe( response => {
      console.log(response)

      alert('This motivation post has been added to wishlist')
      // this.router.navigate(['home'])

    },

    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }


  subscribeToCat(id: any){
    console.log(this.subscription)
    this.motivationService.subscribeCat(this.subscription, id).subscribe( response => {
      console.log(response)

      alert('You have successfully subscribed to this category ')
      // this.router.navigate(['home'])

    },

    error => {
      this.error = error
      console.log('error',error)
    }
    );
  }
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76

   goToCategory(id: any){
    this.router.navigate(['/category',id])
  }

  refresh(): void {
    window.location.reload();
<<<<<<< HEAD
}
=======
  }
>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76
  goToUrl(id: any){
    this.router.navigate(['/motivation',id])
  }

<<<<<<< HEAD
=======
  copyUrl(){
    alert("Motivation link has been copied. Share with your friends!")
  }

>>>>>>> 3897a75b84e84f886e1891e9f51b3122f0825f76

}
