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
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./profile/profile-page/profile-page')
        .then(m => m.ProfilePageComponent),
    children: [
      {
        path: '',
        pathMatch: 'full',
        loadComponent: () =>
          import('./profile/profile-details-page/profile-details-page')
            .then(m => m.ProfileDetailsPageComponent),
      },
      {
        path: 'orders',
        loadComponent: () =>
          import('./profile/order/my-orders-page')
            .then(m => m.MyOrdersPageComponent),
      }
    ]
  }
];
