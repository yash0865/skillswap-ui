import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

const EXCLUDED_AUTH_URLS = ['/login', '/signup'];

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    private authService = inject(AuthService);

    intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        if (this.shouldSkipAuthorization(req.url)) {
            return next.handle(req);
        }

        const authorizationHeader = this.authService.getAuthorizationHeader();
        if (!authorizationHeader) {
            return next.handle(req);
        }

        const authRequest = req.clone({
            setHeaders: {
                Authorization: authorizationHeader
            }
        });

        return next.handle(authRequest);
    }

    private shouldSkipAuthorization(url: string): boolean {
        const requestPath = url.split('?')[0].split('#')[0].toLowerCase();
        return EXCLUDED_AUTH_URLS.some(endpoint => requestPath.endsWith(endpoint));
    }
}
