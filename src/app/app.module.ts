import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { CartComponent } from './cart/cart.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { ProductsService } from './common/services/products.service';
import { AccountSidenavComponent } from './account-sidenav/account-sidenav.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FeaturedProductsComponent } from './featured-products/featured-products.component';


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
    FlyerPrintingComponent,
    CartComponent,
    PlaceOrderComponent,
    AddressBookComponent,
    OrderHistoryComponent,
    AccountSidenavComponent,
    InvoiceComponent,
    FeaturedProductsComponent
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
    ReactiveFormsModule
  ],
  providers: [
    ServiceService,
    AuthService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
