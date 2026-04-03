import {Component, inject, OnInit, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {RevealOnScroll} from '../../../shared/directives/reveal-on-scroll';
import {CartService} from '../../../core/cart/cart-service';
import {Product} from '../models/product';
import {ProductService} from '../services/product.service';
import {of, switchMap} from 'rxjs';

@Component({
  selector: 'app-product-details-page',
  standalone: true,
  imports: [
    RevealOnScroll,
    RouterLink
  ],
  templateUrl: './product-details-page.html',
  styleUrls: ['./product-details-page.css'],
})
export class ProductDetailsPageComponent implements OnInit {

  readonly cartService = inject(CartService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);

  readonly activeImageIndex = signal(0);

  readonly productSlug = signal<string | null>(null);
  readonly product = signal<Product | null>(null);
  readonly isLoading = signal(true);
  readonly notFound = signal(false);

  ngOnInit(): void {
    this.activatedRoute.paramMap.pipe(
      switchMap(params => {
        const slug = params.get('slug');
        this.productSlug.set(slug);

        if (!slug) {
          this.product.set(null);
          this.notFound.set(true);
          this.isLoading.set(false);
          return of(null);
        }

        this.isLoading.set(true);
        this.notFound.set(false);
        this.product.set(null);
        this.activeImageIndex.set(0);

        return this.productService.getProductBySlug(slug);
      })
    ).subscribe({
      next: (product) => {
        if (!product) {
          return;
        }

        this.product.set(product);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('product details error:', err);
        this.product.set(null);
        this.notFound.set(true);
        this.isLoading.set(false);
      }
    });
  }

  setActiveImage(index: number) {
    this.activeImageIndex.set(index);
  }

  get productImages(): string[] {
    const product = this.product();

    return product?.imageUrl ? [product.imageUrl] : [];
  }
}
