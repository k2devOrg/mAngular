import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './authService';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.authReady()) {
    return false;
  }

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/auth'], {
    queryParams: { mode: 'login' },
  });
};
