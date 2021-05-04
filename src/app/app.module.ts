import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

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
import { ServiceService } from './common/services/service.service';
import { MatIconModule } from '@angular/material/icon';
import { AllProductsComponent } from './all-products/all-products.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlyersComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AllProductsComponent,
    TopProductsComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    HttpClientModule,
    MatButtonModule,
    MatMenuModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    RouterModule.forRoot([
      { path: '',component: HomeComponent },
      { path: 'flyers',component: FlyersComponent },
      { path: 'login',component: LoginComponent },
      { path: 'register',component: RegisterComponent },
      { path: 'forgot-password',component: ForgotPasswordComponent },
      { path: 'account',component: AccountComponent }
    ]),
    ReactiveFormsModule

  ],
  providers: [
    ServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
