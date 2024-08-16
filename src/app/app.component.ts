import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projet_angular';

  isLoginRoute: boolean = false;
  isHomePage: boolean = false;
  isRegisterPage: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // Vérifie si l'URL actuelle est '/login' pour cacher la navbar
        this.isLoginRoute = event.url === '/login';
        // Vérifie si l'URL actuelle est '/home'
        this.isHomePage = event.url === '/home';
        // Vérifie si l'URL actuelle est '/register'
        this.isRegisterPage = event.url === '/register';
      }
    });

  }

  ngOnInit(): void {}

  toggleMenu() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      navbar.classList.toggle('responsive');
    }
  } 
}
