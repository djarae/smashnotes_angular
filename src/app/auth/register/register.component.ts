import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
    username: string = '';
    password: string = '';
    confirmPassword: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    async onRegister() {
        if (!this.username || !this.password || !this.confirmPassword) {
            this.errorMessage = 'Please fill all fields';
            return;
        }

        if (this.password !== this.confirmPassword) {
            this.errorMessage = 'Passwords do not match';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            await this.authService.register({ username: this.username, password: this.password });
            this.router.navigate(['/matchups']);
        } catch (error: any) {
            this.errorMessage = error.message;
        } finally {
            this.isLoading = false;
        }
    }

    goToLogin() {
        this.router.navigate(['/login']);
    }
}
