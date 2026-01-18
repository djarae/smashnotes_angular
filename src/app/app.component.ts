import { Component, OnInit } from '@angular/core';
import { authService } from '../services/authentication/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'smash-notes-front';

  isAuthenticated: boolean = false;
  userEmail: string = '';

  ngOnInit(): void {
    this.checkAuthentication();
  }

  checkAuthentication(): void {
    this.isAuthenticated = authService.isAuthenticated();
    if (this.isAuthenticated) {
      const user = authService.getUser();
      this.userEmail = user?.email || '';
    }
  }

  /**
   * Callback cuando el login es exitoso
   */
  onLoginSuccess(): void {
    this.checkAuthentication();
  }

  /**
   * Cierra la sesión
   */
  logout(): void {
    authService.logout();
    this.isAuthenticated = false;
    this.userEmail = '';
  }
}
