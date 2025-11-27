import { Injectable } from '@angular/core';
import axios from 'axios';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  username: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/auth';
  private tokenKey = 'auth_token';
  private usernameKey = 'username';

  constructor() { }

  async register(request: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${this.apiUrl}/register`, request);
      this.saveToken(response.data.token);
      this.saveUsername(response.data.username);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data || 'Registration failed');
    }
  }

  async login(request: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await axios.post<AuthResponse>(`${this.apiUrl}/login`, request);
      this.saveToken(response.data.token);
      this.saveUsername(response.data.username);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data || 'Login failed');
    }
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.usernameKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.usernameKey);
  }

  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  private saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private saveUsername(username: string): void {
    localStorage.setItem(this.usernameKey, username);
  }
}
