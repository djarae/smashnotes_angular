import { Component } from '@angular/core';
import { authService } from '../../../services/authentication/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    email: string = '';
    password: string = '';
    errorMessage: string = '';
    isLoading: boolean = false;
    showPassword: boolean = false;

    async onSubmit(): Promise<void> {
        // Validación básica
        if (!this.email || !this.password) {
            this.errorMessage = 'Por favor, ingresa email y contraseña';
            return;
        }

        this.isLoading = true;
        this.errorMessage = '';

        try {
            await authService.login(this.email, this.password);

            // Login exitoso - recargar la página o navegar
            window.location.reload();

        } catch (error: any) {
            this.errorMessage = error.message || 'Error al iniciar sesión';
        } finally {
            this.isLoading = false;
        }
    }

    togglePasswordVisibility(): void {
        this.showPassword = !this.showPassword;
    }
}
