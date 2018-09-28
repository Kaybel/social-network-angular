import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private snackBar: MatSnackBar, private router: Router) {
    this.createRegisterForm();
   }

  ngOnInit() {
  }
  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      emailRegister: ['', Validators.compose([Validators.required, Validators.email])],
      pass: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  onRegister() {
    this.authService.signUp(this.registerForm.value.emailRegister, this.registerForm.value.pass)
    .then(() => {
      this.router.navigate(['/home']);
    })
    .catch(() => {
      this.snackBar.open('Error en tu Registro, ¡Intentemoslo otra vez!'
      , null
      , {
        duration: 4000
      });
    });
  }

}


