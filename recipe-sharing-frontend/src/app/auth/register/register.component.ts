import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [FormsModule, HttpClientModule]
})
export class RegisterComponent {
  username = '';
  email = '';
  password = '';

  constructor(private userService: UserService, private router: Router) {}

  register() {
    // Tipiziranje objekta pomoću modela User
    const registerData: User = { 
      username: this.username, 
      email: this.email,
      password: this.password 
    };

    // Koristi UserService umjesto izravnog HTTP poziva
    this.userService.register(registerData).subscribe(
      () => {
        alert('Registracija uspješna!');
        //this.router.navigate(['/login']);  // Preusmjeri korisnika na login nakon uspješne registracije
      },
      (error) => {
        alert('Došlo je do greške prilikom registracije');
        console.error(error);
      }
    );
  }
}
