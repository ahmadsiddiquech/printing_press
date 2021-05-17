import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router'
import { HttpClientModule } from '@angular/common/http'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';


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
import { AllProductsComponent } from './all-products/all-products.component';
import { TopProductsComponent } from './top-products/top-products.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { FlyerPrintingComponent } from './flyer-printing/flyer-printing.component';
import { AuthService } from './common/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FlyersComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AccountComponent,
    AllProductsComponent,
    TopProductsComponent,
    ForgotPasswordComponent,
    FlyerPrintingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
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
    MatStepperModule,
    MatTabsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatRadioModule,
    MatExpansionModule,
    RouterModule.forRoot([
      { path: '',component: HomeComponent },
      { path: 'flyers',component: FlyersComponent },
      { path: 'login',component: LoginComponent },
      { path: 'register',component: RegisterComponent },
      { path: 'forgot-password',component: ForgotPasswordComponent },
      { path: 'account',component: AccountComponent },
      { path: 'flyer-printing',component: FlyerPrintingComponent },
      { path: 'top-products',component: TopProductsComponent },
      { path: 'all-products',component: AllProductsComponent }
    ]),
    ReactiveFormsModule
    

  ],
  providers: [
    ServiceService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
