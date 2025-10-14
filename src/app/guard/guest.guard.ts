import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../service/auth.service';

export const guestGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isConnected()) {
    
    // Rediriger selon le rôle user ou admin
    if (auth.isAdmin()) {
      router.navigate(['/dashboard']);
    } else {
      router.navigate(['/accueil']);
    }
    return false;
  }

  return true;
};
