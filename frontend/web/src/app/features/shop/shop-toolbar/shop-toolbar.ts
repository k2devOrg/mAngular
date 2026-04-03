import { Component, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProductFilters } from '../models/product-filters';

@Component({
  selector: 'app-shop-toolbar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shop-toolbar.html',
  styleUrls: ['./shop-toolbar.css'],
})
export class ShopToolbarComponent {

  readonly filtersChanged = output<ProductFilters>();

  categoryOpen = false;
  priceOpen = false;
  sortOpen = false;

  selectedSortLabel = 'Sortowanie';
  selectedSort = '';

  selectedCategory = '';
  minPrice: number | null = null;
  maxPrice: number | null = null;

  toggleCategory() {
    this.categoryOpen = !this.categoryOpen;
    this.priceOpen = false;
    this.sortOpen = false;
  }

  togglePrice() {
    this.priceOpen = !this.priceOpen;
    this.categoryOpen = false;
    this.sortOpen = false;
  }

  toggleSort() {
    this.sortOpen = !this.sortOpen;
    this.categoryOpen = false;
    this.priceOpen = false;
  }

  closeFilters() {
    this.categoryOpen = false;
    this.priceOpen = false;
    this.sortOpen = false;
  }

  selectSort(label: string, value: string) {
    this.selectedSortLabel = label;
    this.selectedSort = value;
    this.sortOpen = false;
    this.emitFilters();
  }

  selectCategory(value: string) {
    this.selectedCategory = value;
    this.categoryOpen = false;
    this.emitFilters();
  }

  applyPriceFilters() {
    this.priceOpen = false;
    this.emitFilters();
  }

  clearFilters() {
    this.selectedCategory = '';
    this.minPrice = null;
    this.maxPrice = null;
    this.selectedSort = '';
    this.selectedSortLabel = 'Sortowanie';
    this.closeFilters();
    this.emitFilters();
  }

  private emitFilters() {
    this.filtersChanged.emit({
      category: this.selectedCategory || undefined,
      minPrice: this.minPrice,
      maxPrice: this.maxPrice,
      sort: this.selectedSort || undefined,
    });
  }
}
