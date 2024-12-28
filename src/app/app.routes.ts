import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/login/login.routes').then(m => m.routes),
    data: { title: 'Inicio' }

  },
  {
    path: 'home',
    loadChildren: () => import('./features/home/home.routes').then(m => m.homeRoutes),
    canActivate: [authGuard]
  },
  {
    path: '**', redirectTo: ''
  }
];
