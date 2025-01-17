import {Routes} from '@angular/router';
import {authGuard} from '../../guards/auth.guard';

export const POLICIES_ROUTES: Routes = [
  {path: 'new', canActivate: [authGuard],
    loadComponent: () => import("./new-policy/new-policy.component")
      .then(c => c.NewPolicyComponent)},
  {path: ':id/edit', canActivate: [authGuard],
    loadComponent: () => import("./edit-policy/edit-policy.component")
      .then(c => c.EditPolicyComponent) },
]
