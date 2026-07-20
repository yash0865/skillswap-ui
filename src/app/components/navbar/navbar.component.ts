import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { AuthService } from '../../services/auth.service';

interface NavLink {
  label: string;
  active: boolean;
  route?: string;
}

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, NzButtonModule, NzIconModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  private authService = inject(AuthService);
  readonly isLoggedIn = this.authService.isLoggedIn;

  get navLinks(): NavLink[] {
    if (this.isLoggedIn()) {
      return [
        { label: 'Home', active: true, route: '/' },
        { label: 'Browse Skills', active: false, route: '/skills' },
        { label: 'Find Matches', active: false, route: '/matches' },
        { label: 'Sessions', active: false, route: '/sessions' },
        { label: 'Messages', active: false, route: '/messages' }
      ];
    }

    return [
      { label: 'Home', active: true, route: '/' },
      { label: 'Browse Skills', active: false, route: '/skills' },
      { label: 'How It Works', active: false, route: '/how-it-works' },
      { label: 'Community', active: false, route: '/community' }
    ];
  }
}
