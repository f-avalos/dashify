import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../models/user.model';
import { Following } from '../../models/followings.model';
import { Playlists } from '../../models/playlists.model';
import { TopArtists } from '../../models/topArtists.model';
import { TopTracks } from '../../models/topTracks.model';

import { environment } from '../../../../environments/environment';
import { TopGenres } from '../../models/topGenres.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = environment.backendUrl;
  private httpClient: HttpClient = inject(HttpClient);
  private router: Router = inject(Router);


  apiLogout() {
    return this.httpClient.get(`${this.apiUrl}/auth/logout`,{ withCredentials: true}).subscribe(() => {
      this.router.navigate(['/']);
    });
  }

  isLoggedIn(): Observable<{ message: string, isLogged: boolean}> {
    return this.httpClient.get<{ message: string, isLogged: boolean}>(`${this.apiUrl}/auth/protected`,{ withCredentials: true});
  }

  getCurrentUser(): Observable<User> {
    return this.httpClient.get<User>(`${this.apiUrl}/dashify/user`,{ withCredentials: true});
  }

  getArtistFollowing(): Observable<Following>{
    return this.httpClient.get<Following>(`${this.apiUrl}/dashify/followings`,{ withCredentials: true});
  }

  getPlaylist(): Observable<Playlists>{
    return this.httpClient.get<Playlists>(`${this.apiUrl}/dashify/playlists`,{ withCredentials: true});
  }

  getTopArtists(timeRange?: string, limit?: string, offset?: string): Observable<TopArtists>{
    let params = new HttpParams();

    if(timeRange){
      params = params.set('time_range', timeRange);
    }
    if(limit){
      params = params.set('limit', limit);
    }
    if(offset){
      params = params.set('offset', offset);
    }

    return this.httpClient.get<TopArtists>(`${this.apiUrl}/dashify/top/artists`,{ params,withCredentials: true});
  }

  getTopTracks(timeRange?: string, limit?: string, offset?: string): Observable<TopTracks>{
    let params = new HttpParams();

    if(timeRange){
      params = params.set('time_range', timeRange);
    }
    if(limit){
      params = params.set('limit', limit);
    }
    if(offset){
      params = params.set('offset', offset);
    }

    return this.httpClient.get<TopTracks>(`${this.apiUrl}/dashify/top/tracks`,{ params,withCredentials: true});
  }

  getTopGenres(timeRange?: string, limit?: string, offset?: string): Observable<TopGenres[]> {

    // reutilizar getTopArtists para obtener los géneros de los artistas
    return this.getTopArtists(timeRange, limit, offset).pipe(
      map((data) => {
        const genreCount: {[key: string]: {count: number; artists: string[]}} = {};

        data.items.forEach((artist) => {
          artist.genres.forEach((genre) => {
            if (!genreCount[genre]) {
              genreCount[genre] = { count: 0, artists: [] };
            }

            genreCount[genre].count++;

            if (!genreCount[genre].artists.includes(artist.name)) {
              genreCount[genre].artists.push(artist.name);
            }
          });
        });

        const sortedGenres = Object.entries(genreCount)
          .sort((a, b) => b[1].count - a[1].count)
          .map(([genre, data]) => ({ genre, count: data.count, artists: data.artists }));

        return sortedGenres;
      })
    );
  }
}
