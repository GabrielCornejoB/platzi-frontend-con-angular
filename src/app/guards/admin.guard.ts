import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { map } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  authService.profile$.subscribe((data) => console.log(data));

  return authService.profile$.pipe(
    map((user) => {
      console.log(user);
      if (user?.role == 'admin') return true;

      router.navigateByUrl('/home');
      return false;
    })
  );
};
