import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzUploadModule, NzUploadFile } from 'ng-zorro-antd/upload';
import { NzMessageService } from 'ng-zorro-antd/message';
import {NavbarComponent} from "../../components/navbar/navbar.component";
import { ProfileService } from '../../services/profile.service';

import { EditProfileDTO } from '../../shared/edit-profile.models';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule,
    NzUploadModule,
    NavbarComponent
  ],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css', '../../shared/auth-shared.css']
})
export class EditProfileComponent implements OnInit {
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private message = inject(NzMessageService);
  private profileService = inject(ProfileService);

  submitting = false;

  avatarPreviewUrl: string | null = 'assets/illustrations/profile.jpg';

  profileForm: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    location: ['', [Validators.required, Validators.maxLength(50)]],
    bio: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    linkedInURL: [''],
    portfolio: ['']
  });

  get f() {
    return this.profileForm.controls;
  }

  get bioCharCount(): number {
    return (this.profileForm.value.bio || '').length;
  }

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: profile => {
        this.profileForm.patchValue({
          name: profile.userName ?? '',
          location: profile.userLocation ?? '',
          bio: profile.userBio ?? '',
          linkedInURL: profile.linkedInURL ?? '',
          portfolio: profile.portfolio ?? ''
        });

        if (profile.avatarUrl) {
          this.avatarPreviewUrl = profile.avatarUrl;
        }
      },
      error: err => {
        console.error('Failed to load profile for editing', err);
      }
    });
  }

  onAvatarSelected(file: NzUploadFile): boolean {
    const reader = new FileReader();
    reader.onload = () => {
      this.avatarPreviewUrl = reader.result as string;
    };
    reader.readAsDataURL(file as unknown as Blob);
    // Return false to stop ng-zorro's default auto-upload — swap in your
    // upload service call here instead (see README).
    return false;
  }

  submit(): void {
    debugger;
    if (this.profileForm.invalid) {
      Object.values(this.profileForm.controls).forEach(control => {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      });
      return;
    }

    const payload: EditProfileDTO = this.profileForm.value;

    this.submitting = true;

    this.profileService.updateProfile(payload).subscribe({
      next: responseText => {
        if (responseText === 'Profile Updated') {
          this.message.success(responseText);
        } else {
          this.message.error('Unexpected response from server');
          console.warn('Edit profile returned unexpected response:', responseText);
        }
        this.submitting = false;
      },
      error: err => {
        this.message.error('Failed to update profile');
        console.error('Failed to update profile', err);
        this.submitting = false;
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/profile']);
  }
}