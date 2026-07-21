import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { EditProfileComponent } from './pages/edit-profile/edit-profile.component';
import { AuthGuard } from './services/auth.guard';
import { BrowseSkillsComponent } from './pages/browse-skills/browse-skills.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard] },
    { path: 'browse-skills', component: BrowseSkillsComponent, canActivate: [AuthGuard] }
];
