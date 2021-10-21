import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authguard/auth.guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';
import { HomeComponent } from './components/home/home.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReviewThreadComponent } from './components/review-thread/review-thread.component';
import { SignupComponent } from './components/signup/signup.component';
import { SingleMotivationComponent } from './components/single-motivation/single-motivation.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { Category } from './models/category';

const routes: Routes = [

  { path: '', redirectTo: 'landing', pathMatch: 'full' },
  { path: 'landing', component: LandingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'motivation/:id', component: SingleMotivationComponent, canActivate: [AuthGuard]  },
  { path: 'review/:id', component: ReviewThreadComponent, canActivate: [AuthGuard]  },
  { path: 'category/:id', component: FilterCategoryComponent, canActivate: [AuthGuard]  },
  { path: 'wishlist', component: WishlistComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
