import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private service : ServiceService){ }

  registration_form = new FormGroup({
    first_name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
    ]),
    last_name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
    ]),
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('',[
      Validators.required
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
    var user = this.registration_form.value;
    user.role = "admin";
    this.service.resgisterAdmin(user)
    .subscribe(
      response => {
        console.log("done")
      }
    )
  }

}
