import { inject, Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';

import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private clientId = environment.clientId;
  private redirectUri = `${environment.backendUrl}/auth/callback`;
  private scopes = 'user-read-private user-top-read user-follow-read user-read-email playlist-read-private';

  apiService: ApiService = inject(ApiService);
  router: Router = inject(Router);

  private isLoggedInSubject = new BehaviorSubject<boolean | null>(null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  login(): void {

    const params= {
      response_type: 'code',
      client_id: this.clientId,
      scope: this.scopes,
      redirect_uri: this.redirectUri,
      state: 'another-string-with-random-value',
    }


    const urlParams = new URL("https://accounts.spotify.com/authorize");
    urlParams.search = new URLSearchParams(params).toString();
    window.location.href = urlParams.toString();
  }

  logout(): void {
    this.apiService.apiLogout();
  }

  checkLoginStatus(): Observable<boolean> {
    return this.apiService.isLoggedIn().pipe(
      map(res => res.isLogged),
      tap(isLogged => {
        this.isLoggedInSubject.next(isLogged);
      })
    )
  }

  isLoggedIn(): Observable<boolean | null> {
    if(this.isLoggedInSubject.getValue() === null){
      return this.checkLoginStatus();
    }
    return this.isLoggedIn$
  }
}
