import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private usersUrl = `${environment.api_base_url}api/users`;
  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get(this.usersUrl);
  }

  getUser(id: any) {
    return this.http.get(this.usersUrl + '/' + id);
  }

  resgisterAdmin(user: any) {
    return this.http.post(this.usersUrl, user);
  }

  loginAdmin(user: any) {
    return this.http.post(this.usersUrl + '/login', user);
  }

  updateUsers(id: any, user: any) {
    return this.http.put(this.usersUrl + '/' + id, user);
  }

  updateUsersImage(id: any, user: any) {
    return this.http.put(this.usersUrl + '/upload_image/' + id, user);
  }

}
