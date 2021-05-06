import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../common/services/service.service';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent{
  constructor(private service : ServiceService){
    const user_id = localStorage.getItem("user_id");
    this.service.getUser(user_id)
    .subscribe(
      response => {
        this.user_data = response;
        if(this.user_data.success){
          this.user_data = this.user_data.data;
        }
        console.log(this.user_data);
      },
      error => {
        alert("Unexpected Error Occured"),
        console.log(error)
      }
    )
  }
  user_data:any;



  result :any = {};

  name_form = new FormGroup({
    first_name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
    ]),
    last_name: new FormControl('',[
      Validators.required,
      Validators.minLength(4),
    ])
  });

  email_form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    password: new FormControl('',[
      Validators.required
    ])
  });

 
  get first_name(){
    return this.name_form.get("first_name");
  }

  get last_name(){
    return this.name_form.get("last_name");
  }

  get email(){
    return this.email_form.get("email");
  }

  get password(){
    return this.email_form.get("password");
  }

  email_submit(){
    if(this.email_form.valid){
      var user = this.email_form.value;
      user.role = "admin";
      this.service.resgisterAdmin(user)
      .subscribe(
        response => {
          console.log("done")
        }
      )
    }
    
  }

  name_submit(){
    if(this.name_form.valid){
      var user = this.name_form.value;
      this.service.updateUsers(user).subscribe(
        response => {
          this.result = response;
          if(this.result.success){
            console.log("success")
          }else{
            console.log("error");
          }
        }
      )
    }
    
  }

}
