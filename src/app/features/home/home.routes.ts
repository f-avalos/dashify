import { Routes } from '@angular/router';
import { HomeComponent } from './page/home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '', loadChildren: () => import('./../profile/profile.routes').then(m => m.profileRoutes)
      },
      {
        path: 'playlist', loadChildren: () => import('./../playlist/playlist.routes').then(m => m.playlistRoutes)
      },
      {
        path: 'review', loadChildren: () => import('./../review/review.routes').then(m => m.reviewRoutes)
      }
    ]
  }
]
