import {Component, signal} from '@angular/core';
import {ShopToolbarComponent} from '../shop-toolbar/shop-toolbar';
import {ProductGridComponent} from '../product-grid/product-grid';
import {ProductFilters} from '../models/product-filters';
import {ShopHeaderComponent} from '../shop-header/shop-header';

@Component({
  selector: 'app-shop-page',
  standalone: true,
  imports: [ShopToolbarComponent, ProductGridComponent, ShopHeaderComponent],
  templateUrl: './shop-page.html',
  styleUrls: ['./shop-page.css'],
})
export class ShopPageComponent {

  readonly filters = signal<ProductFilters>({
    category: undefined,
    minPrice: null,
    maxPrice: null,
    sort: undefined,
  });

  onFiltersChanged(filters: ProductFilters) {
    this.filters.set(filters);
  }
}
