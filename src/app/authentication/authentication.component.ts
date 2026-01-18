import { Component, OnInit } from '@angular/core';
import { authService } from '../../services/authentication/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

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

  logout(): void {
    authService.logout();
    this.isAuthenticated = false;
    this.userEmail = '';
    // Opcionalmente recargar la página
    window.location.reload();
  }
}
