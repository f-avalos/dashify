import { CanActivateFn } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService: AuthService = inject(AuthService);
  const router: Router = inject(Router);

  try{
    const isLogged = await firstValueFrom(authService.isLoggedIn());
    if(!isLogged){
      router.navigate(['/']);
      return false
    }
    return true
  }catch(error){
    router.navigate(['/']);
    return false
  }
};

export const authGuardReverse: CanActivateFn = async (route, state) => {
  return true
}
