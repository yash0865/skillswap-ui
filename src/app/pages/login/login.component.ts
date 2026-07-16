import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { LoginDTO } from '../../shared/auth.models';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzGridModule,
    NzAlertModule,
    NavbarComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/auth-shared.css', './login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  passwordVisible = false;
  submitting = false;
  loginError = '';

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
    rememberMe: [false]
  });

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  get f() {
    return this.loginForm.controls;
  }

  submit(): void {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    const payload: LoginDTO = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    };

    this.submitting = true;
    this.loginError = '';
    this.authService.login(payload).subscribe({
      next: () => {
        this.submitting = false;
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (err) => {
        this.submitting = false;
        this.loginError = this.getLoginErrorMessage(err);
        console.error('Login failed', err);
      }
    });
  }

  private getLoginErrorMessage(err: any): string {
    const rawMessage = typeof err?.error === 'string' ? err.error : '';
    const normalized = rawMessage.trim().toLowerCase();

    if (normalized.includes('email') && normalized.includes('not')) {
      return 'Email not registered. Please sign up first.';
    }

    if (normalized.includes('incorrect password')) {
      return 'Incorrect password. Please try again.';
    }

    if (rawMessage) {
      return rawMessage;
    }

    return 'Login failed. Please check your credentials and try again.';
  }

  continueWithGoogle(): void {
    // TODO: redirect to OAuth2 endpoint, e.g. window.location.href = '/oauth2/authorization/google';
  }

  continueWithGitHub(): void {
    // TODO: redirect to OAuth2 endpoint, e.g. window.location.href = '/oauth2/authorization/github';
  }
}