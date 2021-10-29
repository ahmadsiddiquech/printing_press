import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../common/services/service.service';
import { AuthService } from '../common/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
  providers: [MatSnackBar]
})
export class AccountComponent implements OnInit {

  user_data: any;
  result: any;
  user_id: any;
  token: any;
  loggedIn: any;
  myFile: any;
  selectedFile: any;
  constructor(private service: ServiceService, private auth: AuthService, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if (this.loggedIn) {
      this.token = localStorage.getItem("token");
      this.user_id = localStorage.getItem("user_id");

      this.service.getUser(this.user_id, this.token).subscribe(response => {
        this.result = response;
        if (this.result.success) {
          this.user_data = this.result.data;
        }
      },
        error => {
          console.log(error)
        }
      )
    } else {
      this.router.navigateByUrl("/");
    }
  }

  name_form = new FormGroup({
    first_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    last_name: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    telephone: new FormControl('', [
      Validators.required,
    ]),
    mobile: new FormControl('', [
      Validators.required,
    ])
  });


  password_form = new FormGroup({
    old_password: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    new_password: new FormControl('', [
      Validators.required,
      Validators.email,
    ]),
    renew_password: new FormControl('', [
      Validators.required,
      Validators.email,
    ])
  });


  get first_name() {
    return this.name_form.get("first_name");
  }

  get last_name() {
    return this.name_form.get("last_name");
  }

  get email() {
    return this.name_form.get("email");
  }

  get telephone() {
    return this.name_form.get("telephone");
  }
  get mobile() {
    return this.name_form.get("mobile");
  }

  get old_password() {
    return this.password_form.get("old_password");
  }
  get new_password() {
    return this.password_form.get("new_password");
  }
  get renew_password() {
    return this.password_form.get("renew_password");
  }

  password_submit() {
    if (this.password_form.valid) {
      var user = this.password_form.value;
      this.service.updateUsers(this.user_id, user)
        .subscribe(
          response => {
            this.result = response;
            if (this.result.success) {
              this.snackBar.open(this.result.message, 'Okay', {
                duration: 5 * 1000,
              });
            } else {
              console.log("error");
            }
          }
        )
    }
  }

  name_submit() {
    if (this.name_form.valid) {
      var user = this.name_form.value;
      this.service.updateUsers(this.user_id, user).subscribe(
        response => {
          this.result = response;
          if (this.result.success) {
            this.snackBar.open(this.result.message, 'Okay', {
              duration: 5 * 1000,
            });
          } else {
            console.log("error");
          }
        }
      )
    }

  }

  image_submit() {
    const formdata = new FormData();
    formdata.append('image', this.selectedFile, this.selectedFile.name);
    this.service.updateUsersImage(this.user_id, formdata).subscribe(
      response => {
        this.result = response;
        if (this.result.success) {
          this.snackBar.open(this.result.message, 'Okay', {
            duration: 5 * 1000,
          });
        } else {
          console.log("error");
        }
      }
    )
  }


  onImageChange(event: any) {
    if (event.target.files.length > 0) {
      this.myFile = event.target.files[0];
      if (this.myFile.size <= 5242880) {
        this.selectedFile = event.target.files[0];
      }
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }

}
