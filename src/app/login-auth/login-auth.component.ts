import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login-auth',
  templateUrl: './login-auth.component.html',
  styleUrls: ['./login-auth.component.css']
})
export class LoginAuthComponent implements OnInit {

  constructor(public authService: AuthService, private snackBar: MatSnackBar, private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
  }

  loginWithGoogle() {
    this.authService.loginGoogle()
    .then(response => {
      this.router.navigate(['/home']);
    })
    .catch(() => {
      this.snackBar.open('Error ¡Intentemoslo otra vez!'
      , null
      , {
        duration: 4000
      });
    });
  }

  loginWithFacebook() {
   this.authService.loginFacebook()
   .then(response => {
     this.router.navigate(['/home']);
   })
   .catch(() => {
    this.snackBar.open('Error ¡Intentemoslo otra vez!'
    , null
    , {
      duration: 4000
    });
   });
 }

}
