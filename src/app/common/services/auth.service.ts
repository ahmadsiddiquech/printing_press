import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServiceService } from './service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus: any;
  userId: any;

  private _isLoggedIn = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private service: ServiceService,) { }
  setLoggedIn(token: any, data: any) {
    localStorage.setItem('token', token);
    localStorage.setItem('user_id', data.id);
  }

  get isLoggedIn(): Observable<boolean> {
    this.loggedInStatus = localStorage.getItem('token');
    if (this.loggedInStatus !== null) {
      this._isLoggedIn.next(true)
    } else {
      this._isLoggedIn.next(false)
    }
    return this._isLoggedIn.asObservable();
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.loggedInStatus = "";
  }
}
