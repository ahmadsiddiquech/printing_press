import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../common/services/service.service';
import { AuthService } from './../common/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  user_data:any;
  loggedIn:any;
  constructor(private service : ServiceService,private auth : AuthService,private router: Router){
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if(this.loggedIn){
      this.router.navigateByUrl("/account");
    }
  }

  registration_form = new FormGroup({
    first_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    last_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('',[
      Validators.required,
      Validators.minLength(6)
    ])
  });

  get email(){
    return this.registration_form.get("email");
  }
 
  get first_name(){
    return this.registration_form.get("first_name");
  }

  get last_name(){
    return this.registration_form.get("last_name");
  }

  get password(){
    return this.registration_form.get("password");
  }

  
  onRegister(){
    if(this.registration_form.valid){
      var user = this.registration_form.value;
      user.role = "admin";
      this.service.resgisterAdmin(user)
      .subscribe(
        response => {
          this.user_data = response;
          if(this.user_data.success === true){
            this.auth.setLoggedIn(this.user_data.token,this.user_data.data);
            this.router.navigateByUrl('/account');
          }else{
            console.log(response);
          }
        }
      )
    }
    
  }

}
