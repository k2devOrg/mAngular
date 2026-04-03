import { Routes } from '@angular/router';

export const shopRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./shop-page/shop-page')
        .then(m => m.ShopPageComponent),
  },
  {
    path: 'cart',
    loadComponent: () =>
      import('../cart/cart-page/cart-page')
        .then(m => m.CartPageComponent),
  },
  {
    path: 'product/:slug',
    loadComponent: () =>
      import('./product-details-page/product-details-page')
        .then(m => m.ProductDetailsPageComponent),
  }
];
