import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AddressBookComponent } from './address-book/address-book.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { CartComponent } from './cart/cart.component';
import { FlyerPrintingComponent } from './flyer-printing/flyer-printing.component';
import { FlyersComponent } from './flyers/flyers.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { LoginComponent } from './login/login.component';
import { OrderHistoryComponent } from './order-history/order-history.component';
import { PlaceOrderComponent } from './place-order/place-order.component';
import { RegisterComponent } from './register/register.component';
import { TopProductsComponent } from './top-products/top-products.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'flyers', component: FlyersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'account', component: AccountComponent },
  { path: 'flyer-printing/:id', component: FlyerPrintingComponent },
  { path: 'flyer-printing', component: FlyerPrintingComponent },
  { path: 'top-products', component: TopProductsComponent },
  { path: 'all-products', component: AllProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'place-order', component: PlaceOrderComponent },
  { path: 'my-address-book', component: AddressBookComponent },
  { path: 'my-order-history', component: OrderHistoryComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
