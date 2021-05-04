import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private usersUrl = 'http://localhost:3000/api/users';
  private loginUrl = 'http://localhost:3000/api/login';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.usersUrl);
  }

  resgisterAdmin(user: any){
    return this.http.post(this.usersUrl,user);
  }

  loginAdmin(user: any){
    return this.http.post(this.loginUrl,user);
  }

}
