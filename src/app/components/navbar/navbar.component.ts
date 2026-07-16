import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface NavLink {
  label: string;
  active: boolean;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule, NzIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  navLinks: NavLink[] = [
    { label: 'Home', active: true },
    { label: 'Browse Skills', active: false },
    { label: 'How It Works', active: false },
    { label: 'Community', active: false },
    { label: 'About', active: false }
  ];
}
