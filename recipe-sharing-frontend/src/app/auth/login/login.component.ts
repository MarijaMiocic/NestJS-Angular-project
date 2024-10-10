import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // onSubmit() {
  //   if (this.loginForm.valid) {
  //     const { email, password } = this.loginForm.value;
  //     this.userService.login(email, password).subscribe({
  //       next: (data) => {
  //         if (data.length > 0) {
  //           this.router.navigate(['/profile']); // Preusmjeri na profil
  //         } else {
  //           this.errorMessage = 'Invalid credentials';
  //         }
  //       },
  //       error: (err) => {
  //         this.errorMessage = 'Failed to login';
  //       }
  //     });
  //   }
  // }
}
