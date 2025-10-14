import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  // Si pas connecté → redirection vers home page
  if (!auth.isConnected()) {
    router.navigate(['/']);
    return false;
  }

  // Si la route demande un admin et que l'utilisateur ne l'est pas
  const needAdmin = route.data?.['adminOnly'] === true;
  if (needAdmin && !auth.isAdmin()) {
    router.navigate(['/']);
    return false;
  }

  const userOnly = route.data?.['userOnly'] === true;
  if (userOnly && auth.isAdmin()) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
