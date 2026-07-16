import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginDTO, SignUpDTO } from '../shared/auth.models';

const API_BASE = 'http://localhost:8080/rest/users';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private http = inject(HttpClient);

    login(request: LoginDTO) {
        return this.http.post(`${API_BASE}/login`, request, {
            responseType: 'text' as const
        });
    }

    signup(request: SignUpDTO) {
        return this.http.post(`${API_BASE}/signup`, request, {
            responseType: 'text' as const
        });
    }
}
