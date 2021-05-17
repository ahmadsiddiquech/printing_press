import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../common/services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  loggedIn : Observable<boolean>;

  constructor(private auth : AuthService) {
    this.loggedIn = this.auth.isLoggedIn
  }

  

}
