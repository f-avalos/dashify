import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isAuthenticated = true;

  login(): void {
    //Logica login
    this._isAuthenticated = true;
  }

  logout(): void {
    //Logica logout
    this._isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this._isAuthenticated;
  }
}
