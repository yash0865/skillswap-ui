import { HttpClient } from '@angular/common/http';
import { Injectable, inject, computed, signal } from '@angular/core';
import { tap } from 'rxjs';
import { LoginDTO, LoginResponse, SignUpDTO } from '../shared/auth.models';

const API_BASE = 'http://localhost:8080/rest/users';
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_TOKEN_TYPE_KEY = 'auth_token_type';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);
    private token = signal<string | null>(this.getTokenFromStorage());

    readonly isLoggedIn = computed(() => !!this.token());

    login(request: LoginDTO) {
        return this.http.post<LoginResponse>(`${API_BASE}/login`, request).pipe(
            tap(response => {
                const token = this.extractToken(response);
                const type = this.extractTokenType(response);
                if (!token) {
                    throw new Error('Login response is missing an authentication token.');
                }
                this.setToken(token, type);
            })
        );
    }

    signup(request: SignUpDTO) {
        return this.http.post<LoginResponse>(`${API_BASE}/signup`, request).pipe(
            tap(response => {
                const token = this.extractToken(response);
                const type = this.extractTokenType(response);
                if (token) {
                    this.setToken(token, type);
                }
            })
        );
    }

    getToken(): string | null {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            return null;
        }

        if (this.isTokenExpired(token)) {
            this.clearToken();
            return null;
        }

        return token;
    }

    getTokenType(): string | null {
        return localStorage.getItem(AUTH_TOKEN_TYPE_KEY);
    }

    getAuthorizationHeader(): string | null {
        const token = this.getToken();
        const type = this.getTokenType() ?? 'Bearer';
        return token ? `${type} ${token}` : null;
    }

    clearToken(): void {
        localStorage.removeItem(AUTH_TOKEN_KEY);
        localStorage.removeItem(AUTH_TOKEN_TYPE_KEY);
        this.token.set(null);
    }

    private setToken(token: string, type = 'Bearer'): void {
        localStorage.setItem(AUTH_TOKEN_KEY, token);
        localStorage.setItem(AUTH_TOKEN_TYPE_KEY, type);
        this.token.set(token);
    }

    private getTokenFromStorage(): string | null {
        const token = localStorage.getItem(AUTH_TOKEN_KEY);
        if (!token) {
            return null;
        }

        if (this.isTokenExpired(token)) {
            this.clearToken();
            return null;
        }

        return token;
    }

    private extractToken(response: LoginResponse | null): string | null {
        return response?.token ?? null;
    }

    private extractTokenType(response: LoginResponse | null): string {
        return response?.type ?? 'Bearer';
    }

    private isTokenExpired(token: string): boolean {
        const payload = this.parseJwt(token);
        if (!payload || typeof payload['exp'] !== 'number') {
            return false;
        }

        const now = Math.floor(Date.now() / 1000);
        return payload['exp'] < now;
    }

    private parseJwt(token: string): { [key: string]: any } | null {
        try {
            const parts = token.split('.');
            if (parts.length !== 3) {
                return null;
            }

            const payload = parts[1];
            const decoded = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(decoded);
        } catch {
            return null;
        }
    }
}
