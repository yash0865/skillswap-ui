import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NavbarComponent } from "../../components/navbar/navbar.component";
import { Router, RouterModule } from '@angular/router';
import { ProfileService, UserProfile } from '../../services/profile.service';
import { AuthService } from '../../services/auth.service';
import { SkillsComponent, SkillInfo } from '../../components/skills/skills.component';
import { AboutComponent } from '../../components/about/about.component';

interface ProfileTab {
  label: string;
  count?: number;
}

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzRateModule,
    NzTabsModule,
    NzTagModule,
    NavbarComponent,
    RouterModule,
    SkillsComponent,
    AboutComponent
],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css', '../../shared/auth-shared.css']
})
export class ProfileComponent implements OnInit {
  private profileService = inject(ProfileService);
  private authService = inject(AuthService);
  private router = inject(Router);

  name = 'Loading...';
  bio = '';
  location = '';
  linkedInURL = '';
  portfolio = '';
  verified = false;
  rating = 0;
  reviewCount = 0;
  memberSince = '';
  email = '';
  skills: SkillInfo[] = [];
  reviews: any[] = [];
  sessions: any[] = [];

  tabs: ProfileTab[] = [
    { label: 'About' },
    { label: 'Skills', count: 0 },
    { label: 'Reviews', count: 0 },
    { label: 'Sessions', count: 0 },
    { label: 'Achievements' }
  ];

  selectedTabIndex = 0;

  ngOnInit(): void {
    this.loadProfile();
  }

  private loadProfile(): void {
    this.profileService.getProfile().subscribe({
      next: profile => {
        this.name = profile.userName ?? this.name;
        this.bio = profile.userBio ?? this.bio;
        this.location = profile.userLocation ?? this.location;
        this.linkedInURL = profile.linkedInURL ?? this.linkedInURL;
        this.portfolio = profile.portfolio ?? this.portfolio;
        this.skills = profile.skills ?? [];
        this.reviews = profile.userReviews ?? [];
        this.sessions = profile.userSessions ?? [];
        this.memberSince = profile.memberSince ?? '';
        this.reviewCount = this.reviews.length;
        this.updateTabCounts();
      },
      error: err => {
        console.error('Failed to load profile', err);
      }
    });
  }

  onSkillAdded(skill: SkillInfo): void {
    this.skills = [...this.skills, skill];
    this.updateTabCounts();
  }

  onSkillRemoved(skill: SkillInfo): void {
    this.skills = this.skills.filter(s => s.name !== skill.name || s.type !== skill.type);
    this.updateTabCounts();
  }

  private updateTabCounts(): void {
    this.tabs = [
      { label: 'About' },
      { label: 'Skills', count: this.skills.length },
      { label: 'Reviews', count: this.reviews.length },
      { label: 'Sessions', count: this.sessions.length },
      { label: 'Achievements' }
    ];
  }

  editProfile(): void {
    this.router.navigate(['/edit-profile']);
  }

  shareProfile(): void {
    // TODO: open a share sheet / copy profile link
  }

  logout(): void {
    this.authService.clearToken();
    this.router.navigate(['/login']);
  }
}