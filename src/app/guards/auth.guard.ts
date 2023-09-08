import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  return authService.profile$.pipe(
    map((user) => {
      if (!user) {
        router.navigate(['/home']);
        return false;
      }
      return true;
    })
  );
};
