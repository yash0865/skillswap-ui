import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface SkillInfo {
  name: string;
  type: 'LEARN' | 'TEACH';
}

export interface UserProfile {
  userName: string;
  userBio?: string;
  userLocation?: string;
  linkedInURL?: string;
  portfolio?: string;
  avatarUrl?: string;
  skills?: SkillInfo[];
  userReviews?: any[];
  userSessions?: any[];
  memberSince?: string | null;
}

@Injectable({ providedIn: 'root' })
export class ProfileService {
  private http = inject(HttpClient);
  private readonly profileApiUrl = 'http://localhost:8080/rest/users/profile';

  getProfile(): Observable<UserProfile> {
    return this.http.get<UserProfile>(this.profileApiUrl);
  }

  updateProfile(profileData: Partial<UserProfile>): Observable<string> {
    return this.http.put(this.profileApiUrl, profileData, { responseType: 'text' as const });
  }
}
