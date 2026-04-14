import { Routes } from '@angular/router';
import {authGuard} from '../../core/auth/auth.guard';

export const authRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./auth-panel/auth-panel')
        .then(m => m.AuthPanelComponent),
  },
  {
    path: 'my-orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./order/my-orders-page')
        .then(m => m.MyOrdersPageComponent),
  }
];
