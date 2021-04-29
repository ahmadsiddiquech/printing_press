import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private usersUrl = 'http://localhost:3000/api/users';
  constructor(private http:HttpClient) { }

  getUsers(){
    return this.http.get(this.usersUrl);
  }

  resgisterAdmin(user: any){
    return this.http.post(this.usersUrl,user);
  }

  // updatePost(post: { id: string; }){
  //   return this.http.patch(this.usersUrl + '/' + post.id,JSON.stringify({ isRead : true }));
  // }

  // deletePost(id: string | number){
  //   console.log(id);
  //   return this.http.delete(this.usersUrl + '/' + id);
  // }
}
