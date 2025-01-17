import { Routes } from '@angular/router';
import {authGuard} from './guards/auth.guard';

export const routes: Routes = [
  {path: '', loadComponent:() => import("./pages/welcome/welcome.component")
      .then(c => c.WelcomeComponent) },
  {path: 'signin', loadComponent:() => import("./pages/signin/signin.component")
      .then(c => c.SigninComponent) },
  {path: 'signup', loadComponent:() => import("./pages/signup/signup.component")
  .then(c => c.SignupComponent) },
  {path: 'dashboard', canActivate: [authGuard],
    loadComponent:() => import("./pages/dashboard/dashboard.component")
      .then(c => c.DashboardComponent) },
  {path: 'policies', canActivate: [authGuard],
    loadChildren: () => import("./pages/policies/policies.routes")
      .then(r => r.POLICIES_ROUTES)}
];
