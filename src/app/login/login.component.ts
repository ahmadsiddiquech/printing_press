import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private service : ServiceService){ }

  login_form = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get email(){
   return this.login_form.get("email");
  }

  get password(){
    return this.login_form.get("password");
  }


  loginAdmin(){
    if(this.login_form.valid){
      var user = this.login_form.value;
      this.service.loginAdmin(user)
      .subscribe(
        response => {
          console.log(response);
        }
      )
    }
    
  }

}
