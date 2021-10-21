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
@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  constructor(private http: HttpClient, private motivationService: MotivationService,
    private userService: UsersService,
    private categoryService: CategoriesService,
    private review: ReviewService,
  ) {}
  motivations!: Motivation[]
  categories!: Category[]
  users!: Users[]
  reviews!: Review[]
  categoryModel = new Category('')
  hidden = true
  active = true
  data = {
    "is_superuser": true
  }
  admin = true
  status = {
    "is_active": false
  }
  ngOnInit() {
    let promise = new Promise < void > ((resolve, reject) => {
      this.motivationService.getAllMotivations().toPromise().then(
        (response: any) => {
          console.log(response)
          this.motivations = response;
          resolve()
        },
        (error: string) => {
        })
    })
    this.get_admin()
    this.get_users()
    this.get_categories()
    return promise
  }
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
  }
  get_categories() {
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
  }
  get_admin() {
    $('#dashbord-body').fadeIn()
    $('#dashbord-student').fadeOut()
    $('#dashbord-posts').fadeOut()
    $('#dashbord-categories').fadeOut()
    $('#dashbord-admins').fadeOut()
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
  }
  flagReview() {
    this.hidden = false
    this.active = false
  }
  onSubmit() {
    this.categoryService.addCategory(this.categoryModel)
      .subscribe(data => console.log('success', data),
        error => console.log('error', error)
      )
    console.log(this.categoryModel)
    location.reload()
  }
  ChangeUser(id: any) {
    this.userService.ChangeAdmin(id, this.data).subscribe(data => {
      console.log(data)
    })
    alert("user is now an admin")
  }
  changeBg(){
    if(this.status["is_active"] == true){
      $(".user").addClass("changeBg")
    }
  }
  deactivateUser() {
    this.userService.deactivateUser(this.status).subscribe(resp => {
      console.log(resp)
    })
    alert('user deactivated')
    this.changeBg()
  }
  refresh(): void {
    window.location.reload();
}
}
