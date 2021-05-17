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
  loggedIn:any;
  myFile: any;
  selectedFile: any;
  constructor(private service : ServiceService,private auth : AuthService,private router: Router,private snackBar: MatSnackBar){ }

  ngOnInit(){
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if(this.loggedIn){
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

  image_form = new FormGroup({
    name: new FormControl('',[
      Validators.required
    ]),
    file: new FormControl('', [
      Validators.required
    ]),
    imgSrc: new FormControl('', [
      Validators.required
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

  image_submit(){
    const formdata = new FormData();
    formdata.append('image', this.selectedFile, this.selectedFile.name);
    this.service.updateUsersImage(this.user_id,formdata).subscribe(
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


  onImageChange(event :any) {
    if (event.target.files.length > 0) {
      this.myFile = event.target.files[0];
      if (this.myFile.size <= 5242880) {
        this.selectedFile = event.target.files[0];
      }
    }
  }

  logout(){
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
