import { Routes } from '@angular/router';
import { HomeComponent } from './page/home.component';

export const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '', loadChildren: () => import('./../profile/profile.routes').then(m => m.profileRoutes),
        data: { title: 'Perfil' }
      },
      {
        path: 'playlist', loadChildren: () => import('./../playlist/playlist.routes').then(m => m.playlistRoutes),
        data: { title: 'Playlist' }
      },
      {
        path: 'review', loadChildren: () => import('./../review/review.routes').then(m => m.reviewRoutes),
        data: { title: 'Resumen' }
      }
    ]
  }
]
