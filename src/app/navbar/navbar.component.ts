import { Component, OnInit } from '@angular/core';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  loggedIn:any;

  constructor(private auth : AuthService) {
    this.loggedIn = this.auth.isLoggedIn;
  }

  

}
