import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { FormsModule } from '@angular/forms';

interface Skill {
  name: string;
  icon: string;
  bg: string;
  color: string;
}

interface NavLink {
  label: string;
  active: boolean;
}

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzMenuModule,
    NzGridModule,
    NzCardModule,
    NzAvatarModule,
    NzRateModule,
    NzStatisticModule
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  rating = 4.9;

  navLinks: NavLink[] = [
    { label: 'Home', active: true },
    { label: 'Browse Skills', active: false },
    { label: 'How It Works', active: false },
    { label: 'Community', active: false },
    { label: 'About', active: false }
  ];

  stats: Stat[] = [
    { value: '10,000+', label: 'Members' },
    { value: '150+', label: 'Skills' },
    { value: '5,000+', label: 'Sessions' }
  ];

  skills: Skill[] = [
    { name: 'Java', icon: 'coffee', bg: '#EEF0FE', color: '#5B4FE8' },
    { name: 'Python', icon: 'code', bg: '#FDF0E6', color: '#E8A33D' },
    { name: 'Photography', icon: 'camera', bg: '#111111', color: '#FFFFFF' },
    { name: 'UI/UX Design', icon: 'bg-colors', bg: '#5B4FE8', color: '#FFFFFF' },
    { name: 'Excel', icon: 'file-excel', bg: '#E7F7EF', color: '#1FA971' },
    { name: 'Marketing', icon: 'fund', bg: '#FDEBEE', color: '#EF5D6F' },
    { name: 'Cooking', icon: 'gift', bg: '#FDF3E3', color: '#F0A93E' },
    { name: 'Music', icon: 'customer-service', bg: '#FDEBF1', color: '#EF5D8C' }
  ];
}