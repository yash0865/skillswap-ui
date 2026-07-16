import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { LoginDTO } from '../../shared/auth.models';
import { NavbarComponent } from "../../components/navbar/navbar.component";

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
    NavbarComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['../../shared/auth-shared.css', './login.component.css']
})
export class LoginComponent {
  private fb = inject(FormBuilder);

  passwordVisible = false;
  submitting = false;

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
    // TODO: wire up to your AuthService, e.g.
    // this.authService.login(payload).subscribe({
    //   next: () => this.router.navigate(['/dashboard']),
    //   error: (err) => { this.submitting = false; /* show error */ },
    //   complete: () => this.submitting = false
    // });
    console.log('Login payload', payload);
  }

  continueWithGoogle(): void {
    // TODO: redirect to OAuth2 endpoint, e.g. window.location.href = '/oauth2/authorization/google';
  }

  continueWithGitHub(): void {
    // TODO: redirect to OAuth2 endpoint, e.g. window.location.href = '/oauth2/authorization/github';
  }
}