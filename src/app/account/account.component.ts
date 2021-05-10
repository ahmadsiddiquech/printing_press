import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../common/services/service.service';
import { AuthService } from './../common/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MatSnackBar]
})
export class AccountComponent implements OnInit{

  user_data:any;
  result:any;
  user_id:any;
  constructor(private service : ServiceService,private auth : AuthService,private router: Router,private snackBar: MatSnackBar){ }

  ngOnInit(){
    const loggedIn = this.auth.isLoggedIn;
    if(loggedIn){
       this.user_id = localStorage.getItem("user_id");
      this.service.getUser(this.user_id)
      .subscribe(
        response => {
          this.user_data = response;
          if(this.user_data.success){
            this.user_data = this.user_data.data;
          }
        },
        error => {
          console.log(error)
        }
      )
    }else{
      this.router.navigateByUrl("/");
    }
  }
  
  name_form = new FormGroup({
    first_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ]),
    last_name: new FormControl('',[
      Validators.required,
      Validators.minLength(3),
    ])
  });

  email_form = new FormGroup({
    email: new FormControl('',[
      Validators.required,
      Validators.email,
    ]),
    // password: new FormControl('',[
     
    // ])
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
      this.service.updateUsers(this.user_id,user)
      .subscribe(
        response => {
          this.result = response;
          if(this.result.success){
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
          }else{
            console.log("error");
          }
        }
      )
    }
    
  }

  name_submit(){
    if(this.name_form.valid){
      var user = this.name_form.value;
      this.service.updateUsers(this.user_id,user).subscribe(
        response => {
          this.result = response;
          if(this.result.success){
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
          }else{
            console.log("error");
          }
        }
      )
    }
    
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/');
  }

}
