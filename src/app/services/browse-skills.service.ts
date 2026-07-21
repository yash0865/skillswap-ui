import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

export interface BrowseSkillSkill {
    name: string;
    type: 'TEACH' | 'LEARN' | string;
}

export interface BrowseSkill {
    id: number;
    name: string;
    imageURL: string;
    location: string;
    rating: number;
    skills: BrowseSkillSkill[];
}

@Injectable({ providedIn: 'root' })
export class BrowseSkillsService {
    private http = inject(HttpClient);
    private readonly browseSkillsUrl = 'http://localhost:8080/rest/browse-skills';

    getBrowseSkills(): Observable<BrowseSkill[]> {
        return this.http.get<BrowseSkill[]>(this.browseSkillsUrl);
    }
}