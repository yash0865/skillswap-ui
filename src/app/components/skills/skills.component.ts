import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageService } from 'ng-zorro-antd/message';
import { SkillsService, SkillDTO } from '../../services/skills.service';

export interface SkillInfo {
  name: string;
  type: 'LEARN' | 'TEACH';
}

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, FormsModule, NzCardModule, NzButtonModule, NzInputModule, NzIconModule],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  @Input() skills: SkillInfo[] = [];
  @Output() skillAdded = new EventEmitter<SkillInfo>();
  @Output() skillRemoved = new EventEmitter<SkillInfo>();

  addLearnMode = false;
  addTeachMode = false;
  newLearnSkill = '';
  newTeachSkill = '';
  private message = inject(NzMessageService);
  private skillsService = inject(SkillsService);

  get learnSkills(): SkillInfo[] {
    return this.skills.filter(skill => skill.type === 'LEARN');
  }

  get teachSkills(): SkillInfo[] {
    return this.skills.filter(skill => skill.type === 'TEACH');
  }

  toggleLearnInput(): void {
    this.addLearnMode = !this.addLearnMode;
    if (this.addLearnMode) {
      this.addTeachMode = false;
    }
  }

  toggleTeachInput(): void {
    this.addTeachMode = !this.addTeachMode;
    if (this.addTeachMode) {
      this.addLearnMode = false;
    }
  }

  addSkill(type: 'LEARN' | 'TEACH'): void {
    const skillName = type === 'LEARN' ? this.newLearnSkill.trim() : this.newTeachSkill.trim();
    if (!skillName) {
      return;
    }

    const payload: SkillDTO = { name: skillName, type };
    this.skillsService.addUserSkill(payload).subscribe({
      next: () => {
        this.skillAdded.emit({ name: skillName, type });
        this.message.success('New Skill Added');
      },
      error: err => {
        console.error('Failed to add skill', err);
        this.message.error('Failed to add skill');
      }
    });

    if (type === 'LEARN') {
      this.newLearnSkill = '';
      this.addLearnMode = false;
    } else {
      this.newTeachSkill = '';
      this.addTeachMode = false;
    }
  }

  removeSkill(skill: SkillInfo): void {
    this.skillsService.deleteUserSkill({ name: skill.name, type: skill.type }).subscribe({
      next: () => {
        this.skillRemoved.emit(skill);
        this.message.success('Skill removed');
      },
      error: err => {
        console.error('Failed to remove skill', err);
        this.message.error('Failed to remove skill');
      }
    });
  }

  /** First letter shown inside each skill's icon circle, since skills are free-form text. */
  initialFor(skillName: string): string {
    return skillName.trim().charAt(0).toUpperCase();
  }
}