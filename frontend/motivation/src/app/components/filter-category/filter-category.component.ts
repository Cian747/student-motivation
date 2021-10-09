import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Motivation } from 'src/app/models/motivation';
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


  constructor(
    private http: HttpClient,
    private motivationService: MotivationService,
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
        // categories
      this.motivationService.getAllCategories().toPromise().then(
        (response:any) => {
        this.categories = response;
        resolve()
      },
      (error:string) => {

      })
    })
    // return promise
  }


   goToCategory(id: any){
    this.router.navigate(['/category',id])
  }

  refresh(): void {
    window.location.reload();
}
  goToUrl(id: any){
    this.router.navigate(['/motivation',id])
  }


}
