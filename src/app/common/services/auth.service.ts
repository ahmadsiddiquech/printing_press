import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loggedInStatus:any;

  constructor(private http:HttpClient) { }
  setLoggedIn(token :any,data:any){
    localStorage.setItem('token',token);
    localStorage.setItem('user_id',data.id);
  }

  get isLoggedIn(){
    this.loggedInStatus = localStorage.getItem('token');
    if(this.loggedInStatus !== null){
      return true;
    }else{
      return false;
    }
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user_id');
    this.loggedInStatus = "";
  }
}
