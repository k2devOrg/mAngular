import { Component } from '@angular/core';

@Component({
  selector: 'app-shop-toolbar',
  standalone: true,
  imports: [],
  templateUrl: './shop-toolbar.html',
  styleUrls: ['./shop-toolbar.css'],
})
export class ShopToolbarComponent {

  categoryOpen = false;
  priceOpen = false;
  sortOpen = false;
  selectedSortLabel = 'Sortowanie';

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


  closeFilters() {
    this.categoryOpen = false;
    this.priceOpen = false;
    this.sortOpen = false;
  }


  toggleSort() {
    this.sortOpen = !this.sortOpen;
    this.categoryOpen = false;
    this.priceOpen = false;
  }

  selectSort(label: string) {
    this.selectedSortLabel = label;
    this.sortOpen = false;
  }

}
