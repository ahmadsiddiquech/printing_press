import { Router } from '@angular/router';
import { AuthService } from './../common/services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../common/services/service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MatSnackBar]
})
export class LoginComponent {
  loggedIn: any;
  constructor(private service: ServiceService, private auth: AuthService, private router: Router, private snackBar: MatSnackBar) {
    this.auth.isLoggedIn.subscribe(response => {
      this.loggedIn = response;
    });
    if (this.loggedIn) {
      this.router.navigateByUrl("/account");
    }
  }

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

  get email() {
    return this.login_form.get("email");
  }

  get password() {
    return this.login_form.get("password");
  }

  private data: any = {};
  loginAdmin() {
    if (this.login_form.valid) {
      var user = this.login_form.value;
      this.service.loginAdmin(user)
        .subscribe(
          response => {
            this.data = response;
            if (this.data.success === true) {

              this.auth.setLoggedIn(this.data.token, this.data.data);
              this.router.navigateByUrl('/account');
            } else {
              this.snackBar.open(this.data.message, 'Okay', {
                duration: 5 * 1000,
              });
            }

          }
        )
    }
  }

}
