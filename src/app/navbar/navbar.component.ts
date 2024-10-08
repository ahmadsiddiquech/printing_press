import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';
import { ProductsService } from '../common/services/products.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedIn: Observable<boolean>;
  // cartQty: Observable<number>;
  cartQty: any;

  constructor(private auth: AuthService, private cart: ProductsService, private router: Router) {
    this.loggedIn = this.auth.isLoggedIn;
    // this.cartQty = this.cart.getCartQty;
    this.cart.getCartQty.subscribe(response => {
      this.cartQty = response;
    });
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }



}
