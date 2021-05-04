import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service : ServiceService){ }

  login_form = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  });

  loginAdmin(){
    var user = this.login_form.value;
    this.service.loginAdmin(user)
    .subscribe(
      response => {
        console.log(response);
      }
    )
  }

}
