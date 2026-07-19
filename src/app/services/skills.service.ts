import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface SkillOption {
  name: string;
}

export interface SkillDTO {
  name: string;
  type: 'LEARN' | 'TEACH';
}

@Injectable({ providedIn: 'root' })
export class SkillsService {
  private http = inject(HttpClient);
  private readonly skillsApiUrl = 'http://localhost:8080/rest/skills';
  private readonly userSkillsApiUrl = 'http://localhost:8080/rest/skills/user';

  getSkills(): Observable<SkillOption[]> {
    return this.http.get<SkillOption[]>(this.skillsApiUrl);
  }

  addSkill(name: string): Observable<SkillOption> {
    return this.http.post<SkillOption>(this.skillsApiUrl, { name });
  }

  addUserSkill(skill: SkillDTO): Observable<string> {
    return this.http.post(this.userSkillsApiUrl, skill, { responseType: 'text' as const }) as Observable<string>;
  }

  deleteUserSkill(skill: SkillDTO): Observable<string> {
    return this.http.delete(this.userSkillsApiUrl, {
      body: skill,
      responseType: 'text' as const
    }) as Observable<string>;
  }
}
