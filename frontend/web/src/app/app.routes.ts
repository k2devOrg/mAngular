import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./features/marketing/marketing.routes')
        .then(m => m.marketingRoutes)
  },
  {
    path: 'shop',
    loadChildren: () =>
      import('./features/shop/shop.routes')
        .then(m => m.shopRoutes),
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.authRoutes),
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('./features/legal/terms-page/terms-page').then(m => m.TermsPageComponent),
  },
  {
    path: 'returns',
    loadComponent: () =>
      import('./features/legal/returns-page/returns-page').then(m => m.ReturnsPageComponent),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/legal/privacy-policy-page/privacy-policy-page').then(m => m.PrivacyPolicyPageComponent),
  }
];
