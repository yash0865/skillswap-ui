import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzAlertModule } from 'ng-zorro-antd/alert';

import { SignUpDTO } from '../../shared/auth.models';
import { passwordMatchValidator } from '../../shared/password-match.validator';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-signup',
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
    NzSelectModule,
    NzGridModule,
    NzAlertModule,
    NavbarComponent
],
  templateUrl: './signup.component.html',
  styleUrls: ['../../shared/auth-shared.css', './signup.component.css']
})
export class SignupComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  passwordVisible = false;
  confirmPasswordVisible = false;
  submitting = false;
  signupStatus: 'success' | 'error' | null = null;
  signupMessage = '';

  // "I want to join as" is UI-only for now — SignUpDTO has no role field yet.
  // Add one on the backend if you want this persisted; see README.
  roleOptions = [
    { label: 'Member', value: 'MEMBER' },
    { label: 'Mentor', value: 'MENTOR' }
  ];

  signupForm: FormGroup = this.fb.group(
    {
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(16)]],
      confirmPassword: ['', [Validators.required]],
      role: ['MEMBER'],
      agreeTerms: [false, [Validators.requiredTrue]]
    },
    { validators: passwordMatchValidator('password', 'confirmPassword') }
  );

  togglePasswordVisibility(): void {
    this.passwordVisible = !this.passwordVisible;
  }

  toggleConfirmPasswordVisibility(): void {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  get f() {
    return this.signupForm.controls;
  }

  submit(): void {
    if (this.signupForm.invalid) {
      Object.values(this.signupForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    const payload: SignUpDTO = {
      name: this.signupForm.value.name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password
    };

    this.submitting = true;
    this.signupStatus = null;
    this.signupMessage = '';

    this.authService.signup(payload).subscribe({
      next: () => {
        this.submitting = false;
        this.signupStatus = 'success';
        this.signupMessage = 'Signup successful!';
        setTimeout(() => this.router.navigate(['/']), 1000);
      },
      error: (err) => {
        this.submitting = false;
        this.signupStatus = 'error';
        this.signupMessage = err?.error || 'Signup failed! Please try again.';
        console.error('Signup failed', err);
      }
    });
  }
}