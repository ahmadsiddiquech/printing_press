import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private service : ServiceService){ }

  registration_form = new FormGroup({
    first_name: new FormControl(),
    last_name: new FormControl(),
    email: new FormControl(),
    password: new FormControl()
  });

  
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
