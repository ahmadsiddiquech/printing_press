import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent{

  forgot_password_form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email
    ])
  });

  get email(){
    return this.forgot_password_form.get("email");
  }

  forgot_password(){
    var user = this.forgot_password_form.value;
  }


}
