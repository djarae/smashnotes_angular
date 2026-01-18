import { url_entorno } from '../../configs/url_entorno';

/**
 * Servicio de autenticación para manejar login y tokens JWT
 */
export class AuthService {

    private static readonly TOKEN_KEY = 'smashnotes_jwt_token';
    private static readonly USER_KEY = 'smashnotes_user';

    /**
     * Realiza el login y guarda el token JWT
     */
    async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch(url_entorno() + '/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Error al iniciar sesión');
        }

        const data: LoginResponse = await response.json();

        // Guardar token y datos del usuario en localStorage
        this.setToken(data.token);
        this.setUser({ email: data.email, rol: data.rol });

        return data;
    }

    /**
     * Cierra la sesión eliminando el token
     */
    logout(): void {
        localStorage.removeItem(AuthService.TOKEN_KEY);
        localStorage.removeItem(AuthService.USER_KEY);
    }

    /**
     * Verifica si el usuario está autenticado
     */
    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;

        // Verificar si el token ha expirado
        try {
            const payload = this.decodeToken(token);
            const expirationDate = new Date(payload.exp * 1000);
            return expirationDate > new Date();
        } catch {
            return false;
        }
    }

    /**
     * Obtiene el token JWT almacenado
     */
    getToken(): string | null {
        return localStorage.getItem(AuthService.TOKEN_KEY);
    }

    /**
     * Guarda el token JWT
     */
    private setToken(token: string): void {
        localStorage.setItem(AuthService.TOKEN_KEY, token);
    }

    /**
     * Obtiene los datos del usuario almacenados
     */
    getUser(): UserData | null {
        const userData = localStorage.getItem(AuthService.USER_KEY);
        return userData ? JSON.parse(userData) : null;
    }

    /**
     * Guarda los datos del usuario
     */
    private setUser(user: UserData): void {
        localStorage.setItem(AuthService.USER_KEY, JSON.stringify(user));
    }

    /**
     * Decodifica el payload del token JWT (sin verificar firma)
     */
    private decodeToken(token: string): JwtPayload {
        const parts = token.split('.');
        if (parts.length !== 3) {
            throw new Error('Token JWT inválido');
        }
        const payload = parts[1];
        const decoded = atob(payload);
        return JSON.parse(decoded);
    }

    /**
     * Verifica si el token es válido llamando al backend
     */
    async verifyToken(): Promise<boolean> {
        const token = this.getToken();
        if (!token) return false;

        try {
            const response = await fetch(url_entorno() + '/api/auth/verify', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.ok;
        } catch {
            return false;
        }
    }
}

// Interfaces
export interface LoginResponse {
    token: string;
    email: string;
    rol: string;
}

export interface UserData {
    email: string;
    rol: string;
}

interface JwtPayload {
    sub: string;
    iat: number;
    exp: number;
}

// Singleton instance para usar en toda la app
export const authService = new AuthService();
