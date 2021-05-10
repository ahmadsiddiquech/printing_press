import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_base_url } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private usersUrl = `${api_base_url}api/users`;
  private loginUrl = `${api_base_url}api/login`;
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.usersUrl);
  }

  getUser(id:any){
    return this.http.get(this.usersUrl+'/'+id);
  }

  resgisterAdmin(user: any){
    return this.http.post(this.usersUrl,user);
  }

  loginAdmin(user: any){
    return this.http.post(this.loginUrl,user);
  }

  updateUsers(id:any,user:any){
    return this.http.put(this.usersUrl+'/'+id,user);
  }

}
