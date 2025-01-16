import {CanActivateFn, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router);

  const authUser = authService.authUser()

  if (authUser) {
    return true;
  } else {
    router.navigate(['/signin']);
    return false;
  }
};
