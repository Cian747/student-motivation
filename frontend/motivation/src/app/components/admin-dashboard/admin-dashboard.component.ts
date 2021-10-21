import {
  HttpClient
} from '@angular/common/http';
import {
  analyzeAndValidateNgModules
} from '@angular/compiler';
import {
  Component,
  OnInit
} from '@angular/core';
import * as $ from 'jquery'
import {
  MotivationService
} from 'src/app/services/motivation.service';
import {
  CategoriesService
} from 'src/app/services/categories.service';
import {
  Motivation
} from 'src/app/models/motivation';
import {
  Category
} from 'src/app/models/category';
import {
  Review
} from 'src/app/models/review';
import {
  Users
} from 'src/app/models/users';
import {
  UsersService
} from 'src/app/services/users.service';
import {
  ReviewService
} from 'src/app/services/review.service';
import {
  ProfileService
} from 'src/app/services/profile.service';
<<<<<<< HEAD
=======


>>>>>>> origin/hotfix
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
  constructor(private http: HttpClient, private motivationService: MotivationService,
    private userService: UsersService,
    private categoryService: CategoriesService,
    private review: ReviewService,
  ) {}
<<<<<<< HEAD
=======




>>>>>>> origin/hotfix
  motivations!: Motivation[]
  categories!: Category[]
  users!: Users[]
  reviews!: Review[]
  categoryModel = new Category('')
  hidden = true
  active = true
<<<<<<< HEAD
  data = {
    "is_superuser": true
  }
  admin = true
  status = {
    "is_active": false
  }
  ngOnInit() {
=======

  data = {
    "is_superuser": true
  }

  admin = true

  status = {
    "is_active": false
  }

  ngOnInit() {
    
>>>>>>> origin/hotfix
    let promise = new Promise < void > ((resolve, reject) => {
      this.motivationService.getAllMotivations().toPromise().then(
        (response: any) => {
          console.log(response)
          this.motivations = response;
          resolve()
        },
        (error: string) => {
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
        })
    })
    this.get_admin()
    this.get_users()
    this.get_categories()
    return promise
<<<<<<< HEAD
  }
=======
    

  }

>>>>>>> origin/hotfix
  get_users() {
    $('#dashbord-body').fadeOut()
    $('#dashbord-categories').fadeOut()
    $('#dashbord-posts').fadeOut()
    $('#dashbord-admins').fadeOut()
    $('#dashbord-student').show()
    this.userService.getUsers().subscribe((response: any) => {
      this.users = response
      console.log(response)
    })
  }
  get_posts() {
    $('#dashbord-body').fadeOut()
    $('#dashbord-posts').fadeIn()
    $('#dashbord-categories').fadeOut()
    $('#dashbord-student').fadeOut()
    $('#dashbord-admins').fadeOut()
<<<<<<< HEAD
  }
  get_categories() {
=======

  }
  get_categories() {
    
>>>>>>> origin/hotfix
    $('#dashbord-body').fadeOut()
    $('#dashbord-student').fadeOut()
    $('#dashbord-posts').fadeOut()
    $('#dashbord-admins').fadeOut()
    $('#dashbord-categories').fadeIn()
    this.categoryService.getAllCategories().subscribe((response: any) => {
      this.categories = response
      // console.log(response)
      // console.log(this.categories.length)
    })
<<<<<<< HEAD
=======


>>>>>>> origin/hotfix
  }
  get_admin() {
    $('#dashbord-body').fadeIn()
    $('#dashbord-student').fadeOut()
    $('#dashbord-posts').fadeOut()
    $('#dashbord-categories').fadeOut()
    $('#dashbord-admins').fadeOut()
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
  }
  get_adm() {
    $('#dashbord-body').fadeOut()
    $('#dashbord-student').fadeOut()
    $('#dashbord-posts').fadeOut()
    $('#dashbord-categories').fadeOut()
    $('#dashbord-admins').show()
  }
  deletePost(post: any) {
    this.motivations.splice(post, 1)
<<<<<<< HEAD
=======


>>>>>>> origin/hotfix
  }
  deleteComment(review: any) {
    this.reviews.splice(review, 1)
  }
  getReview(id: any) {
    this.review.getAllMotivationReviews(id)
      .subscribe(response => {
        this.reviews = response
        console.log(response)
      })
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
  }
  flagReview() {
    this.hidden = false
    this.active = false
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
  }
  onSubmit() {
    this.categoryService.addCategory(this.categoryModel)
      .subscribe(data => console.log('success', data),
        error => console.log('error', error)
      )
    console.log(this.categoryModel)
    location.reload()
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
  }
  ChangeUser(id: any) {
    this.userService.ChangeAdmin(id, this.data).subscribe(data => {
      console.log(data)
    })
    alert("user is now an admin")
<<<<<<< HEAD
=======

>>>>>>> origin/hotfix
  }
  changeBg(){
    if(this.status["is_active"] == true){
      $(".user").addClass("changeBg")
<<<<<<< HEAD
    }
  }
  deactivateUser(id:any) {
    this.userService.deactivateUser(id,this.status).subscribe(resp => {
=======

    }

   
  }
  
  deactivateUser() {
    this.userService.deactivateUser(this.status).subscribe(resp => {
>>>>>>> origin/hotfix
      console.log(resp)
    })
    alert('user deactivated')
    this.changeBg()
<<<<<<< HEAD
  }
  refresh(): void {
    window.location.reload();
}
=======
    

  }

  refresh(): void {
    window.location.reload();
}

>>>>>>> origin/hotfix
}
