import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(): boolean{
    // usuario logeado
    if(this.authService.isLoggedIn()){
      return true;
    }else{
      // retorna a login
      this.router.navigate(['/']);
      return false;
    }
  }
}
