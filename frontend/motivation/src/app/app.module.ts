import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { HomeComponent } from './components/home/home.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HttpClientModule , HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MotivationComponent } from './components/motivation/motivation.component';
import { SingleMotivationComponent } from './components/single-motivation/single-motivation.component';
import { FilterCategoryComponent } from './components/filter-category/filter-category.component';
import { TruncateModule } from 'ng2-truncate';
import { AuthInterceptor } from './services/authconfig.interceptors';
import { ClipboardModule } from 'ngx-clipboard';
import { InterceptorInterceptor } from './Auth/interceptor.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    AdminDashboardComponent,
    ProfileComponent,
    NavbarComponent,
    MotivationComponent,
    SingleMotivationComponent,
    FilterCategoryComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    TruncateModule,
    ClipboardModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorInterceptor,
      // useClass: AuthInterceptor,
      multi: true
    }

  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
