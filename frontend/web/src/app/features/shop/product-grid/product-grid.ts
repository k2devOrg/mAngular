import {Component, computed, effect, inject, input, OnInit, signal} from '@angular/core';
import {Router} from '@angular/router';
import {ProductCardComponent} from '../product-card/product-card';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';
import {PageResponse} from '../models/page';
import {ProductFilters} from '../models/product-filters';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.css'],
})
// export class ProductGridComponent implements OnInit {
export class ProductGridComponent {

  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  readonly filters = input<ProductFilters>({
    category: undefined,
    minPrice: null,
    maxPrice: null,
    sort: undefined,
  });

  productList: Product[] = [];

  readonly currentPage = signal(0);
  readonly pageSize = signal(12);
  readonly totalPages = signal(0);
  readonly totalElements = signal(0);

  readonly pages = computed(() =>
    Array.from({ length: this.totalPages() }, (_, index) => index)
  );

  constructor() {
    effect(() => {
      const currentFilters = this.filters();
      this.currentPage.set(0);
      this.loadProducts(currentFilters);
    });
  }

  // ngOnInit(): void {
  //   this.loadProducts(this.filters());
  // }

  loadProducts(filters: ProductFilters): void {
    this.productService.getProducts(this.currentPage(), this.pageSize(), filters).subscribe({
      next: (response: PageResponse<Product>) => {
        this.productList = response.content;
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
      }
    });
  }

  goToPage(page: number): void {
    if (page < 0 || page >= this.totalPages()) {
      return;
    }

    this.currentPage.set(page);
    this.loadProducts(this.filters());

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  goToPreviousPage(): void {
    this.goToPage(this.currentPage() - 1);
  }

  goToNextPage(): void {
    this.goToPage(this.currentPage() + 1);
  }

  onProductClicked(slug: string): void {
    this.router.navigate(['/shop/product', slug]);
  }
}
