import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {
    username: string = '';
    password: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    async onLogin() {
        if (!this.username || !this.password) {
            this.errorMessage = 'Please enter username and password';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            await this.authService.login({ username: this.username, password: this.password });
            this.router.navigate(['/matchups']);
        } catch (error: any) {
            this.errorMessage = error.message;
        } finally {
            this.isLoading = false;
        }
    }

    goToRegister() {
        this.router.navigate(['/register']);
    }
}
