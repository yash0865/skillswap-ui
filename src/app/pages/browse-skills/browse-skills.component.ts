import { CommonModule } from '@angular/common';
import { Component, inject, OnInit  } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NavbarComponent } from '../../components/navbar/navbar.component';

import { SKILL_CATEGORIES, SKILL_AVATAR_URLS, SkillCategory, SkillProfile } from './browse-skills.data';
import { BrowseSkillsService, BrowseSkill } from '../../services/browse-skills.service';

type ViewMode = 'grid' | 'list';
type SortOption = 'relevance' | 'rating' | 'reviews' | 'name';

@Component({
  selector: 'app-browse-skills',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzButtonModule,
    NzAvatarModule,
    NzTagModule,
    NzRateModule,
    NzBadgeModule,
    NzPaginationModule,
    NzToolTipModule,
    NzRadioModule,
    NavbarComponent
  ],
  templateUrl: './browse-skills.component.html',
  styleUrls: ['./browse-skills.component.css', '../../shared/auth-shared.css'],
})
export class BrowseSkillsComponent {
  private browseSkillsService = inject(BrowseSkillsService);
  categories: SkillCategory[] = SKILL_CATEGORIES;
  allProfiles: SkillProfile[] = [];

  searchTerm = '';
  activeCategory = 'all';
  sortBy: SortOption = 'relevance';
  viewMode: ViewMode = 'grid';

  pageIndex = 1;
  pageSize = 8;
  totalResults = 0;

  savedIds = new Set<number>();

  ngOnInit(): void {
    const avatarUrls = Object.values(SKILL_AVATAR_URLS);

    this.browseSkillsService.getBrowseSkills().subscribe((data) => {
      this.allProfiles = data.map((item) => {
        const teachTags = item.skills
          ?.filter((skill) => skill.type?.toUpperCase() === 'TEACH')
          .map((skill) => skill.name) ?? [];
        const learnTags = item.skills
          ?.filter((skill) => skill.type?.toUpperCase() === 'LEARN')
          .map((skill) => skill.name) ?? [];

        const avatarUrl =
          avatarUrls[Math.floor(Math.random() * avatarUrls.length)] ?? item.imageURL;

        return {
          id: item.id,
          name: item.name,
          verified: true,
          title: teachTags[0] ?? learnTags[0] ?? 'Skill',
          status: 'online',
          avatarUrl,
          teachTags,
          learnTags,
          rating: item.rating ?? 0,
          reviews: 0,
          location: item.location,
        };
      });
      this.totalResults = this.allProfiles.length;
    });
  }

  get filteredProfiles(): SkillProfile[] {
    const term = this.searchTerm.trim().toLowerCase();
    let result = this.allProfiles.filter((p) => {
      const matchesTerm =
        !term ||
        p.name.toLowerCase().includes(term) ||
        p.title.toLowerCase().includes(term) ||
        p.teachTags.some((t) => t.toLowerCase().includes(term)) ||
        p.learnTags.some((t) => t.toLowerCase().includes(term));
      return matchesTerm;
    });

    switch (this.sortBy) {
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        result = [...result].sort((a, b) => b.reviews - a.reviews);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break; // relevance = original order
    }

    return result;
  }

  selectCategory(key: string): void {
    this.activeCategory = key;
  }

  toggleSave(id: number, event: MouseEvent): void {
    event.stopPropagation();
    if (this.savedIds.has(id)) {
      this.savedIds.delete(id);
    } else {
      this.savedIds.add(id);
    }
  }

  isSaved(id: number): boolean {
    return this.savedIds.has(id);
  }

  statusLabel(status: SkillProfile['status']): string {
    if (status === 'online') return 'Online';
    if (status === 'offline') return 'Offline';
    return 'Both';
  }

  trackByProfileId(_index: number, profile: SkillProfile): number {
    return profile.id;
  }

  trackByCategoryKey(_index: number, category: SkillCategory): string {
    return category.key;
  }
}