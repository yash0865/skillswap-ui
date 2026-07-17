import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';
import { LoginDTO, LoginResponse, SignUpDTO } from '../shared/auth.models';

const API_BASE = 'http://localhost:8080/rest/users';
const AUTH_TOKEN_KEY = 'auth_token';
const AUTH_TOKEN_TYPE_KEY = 'auth_token_type';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    login(request: LoginDTO) {
        return this.http.post<LoginResponse>(`${API_BASE}/login`, request).pipe(
            tap(response => {
                localStorage.setItem(AUTH_TOKEN_KEY, response.token);
                localStorage.setItem(AUTH_TOKEN_TYPE_KEY, response.type);
            })
        );
    }

    signup(request: SignUpDTO) {
        return this.http.post(`${API_BASE}/signup`, request, {
            responseType: 'text' as const
        });
    }

    getToken(): string | null {
        return localStorage.getItem(AUTH_TOKEN_KEY);
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
    }
}
