import { Routes } from '@angular/router';
import { AuthGuardService } from './core/services/guard/guard.service';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/login/login.routes').then(m => m.routes)
  },
  {
    path: 'home',
    canActivate: [AuthGuardService],
    loadChildren: () => import('./features/home/home.routes').then(m => m.routes)
  },
  {
    path: '**', redirectTo: ''
  }
];
