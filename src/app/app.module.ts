import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatCarouselModule } from '@ngmodule/material-carousel';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { FlyersComponent } from './flyers/flyers.component';
import { HomeComponent } from './home/home.component';
import { AccountComponent } from './account/account.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlyersComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    MatCarouselModule.forRoot(),
    RouterModule.forRoot([
      { path: '',component: HomeComponent },
      { path: 'flyers',component: FlyersComponent },
      { path: 'login',component: LoginComponent },
      { path: 'register',component: RegisterComponent },
      { path: 'account',component: AccountComponent }
    ]),
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
