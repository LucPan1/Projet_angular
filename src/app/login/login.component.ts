import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username: string = "";
  password: string = "";

  isLoginRoute = false;
  isLoggedIn = false;

  constructor(private router: Router) {}

  goHome() {
    this.router.navigate(['/']);
  }

  onLogin() {
    console.log('onLogin() called');
      this.router.navigate(['/home']);
  }

}
