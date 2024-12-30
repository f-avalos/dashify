import { Component, inject, OnInit } from '@angular/core';
import { DetailDataComponent } from '../components/detail-data/detail-data.component';
import { ApiService } from '../../../core/services/api/api.service';
import { User } from '../../../core/models/user.model';
import { CommonModule } from '@angular/common';
import { NgxSkeletonComponent } from 'ngx-skeleton';
import { BoxDataComponent } from '../components/box-data/box-data.component';
import { Following } from '../../../core/models/followings.model';
import { Playlists } from '../../../core/models/playlists.model';
import { ArtistsDataComponent } from '../components/artists-data/artists-data.component';
import { TopArtists } from '../../../core/models/topArtists.model';
import { TopTracks } from '../../../core/models/topTracks.model';
import { TracksDataComponent } from '../components/tracks-data/tracks-data.component';
import { TopGenres } from '../../../core/models/topGenres.model';
import { GenresDataComponent } from '../components/genres-data/genres-data.component';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [DetailDataComponent, ArtistsDataComponent, TracksDataComponent, GenresDataComponent, CommonModule, NgxSkeletonComponent, BoxDataComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  apiService: ApiService = inject(ApiService);
  user : User | undefined = undefined
  playlists: Playlists | undefined = undefined
  following: Following | undefined = undefined
  topArtists: TopArtists | undefined = undefined
  topTracks: TopTracks | undefined = undefined
  topGenres: TopGenres[] | undefined = undefined

  ngOnInit(): void {
    this.apiService.getCurrentUser().subscribe((user) => {
      this.user = user;
    });
    this.apiService.getArtistFollowing().subscribe((following) => {
      this.following = following;
    });
    this.apiService.getPlaylist().subscribe((playlist) => {
      this.playlists = playlist;
    });
    this.apiService.getTopArtists('long_term', '10').subscribe((topArtists) => {
      this.topArtists = topArtists;
    });
    this.apiService.getTopTracks('long_term', '10').subscribe((topTracks) => {
      this.topTracks = topTracks;
    });
    this.apiService.getTopGenres('long_term').subscribe((topGenres) => {
      console.log(topGenres);
      this.topGenres = topGenres;
    });
  }
}
