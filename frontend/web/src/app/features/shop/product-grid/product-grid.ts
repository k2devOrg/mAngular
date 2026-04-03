import {Component, inject, OnInit} from '@angular/core';
import {ProductCardComponent} from '../product-card/product-card';
import {Router} from '@angular/router';
import {ProductService} from '../services/product.service';
import {Product} from '../models/product';

@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-grid.html',
  styleUrls: ['./product-grid.css'],
})
export class ProductGridComponent implements OnInit {

  private readonly router = inject(Router);
  private readonly productService = inject(ProductService);

  productList: Product[] = [];

  ngOnInit(): void {
    this.productService.getProducts().subscribe(response => {
      this.productList = response.content;
    });
  }

  onProductClicked(slug: string) {
    this.router.navigate(['/shop/product', slug]);
  }
}
