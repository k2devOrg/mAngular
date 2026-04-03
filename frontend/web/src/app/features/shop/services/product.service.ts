import {inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../models/product';
import {PageResponse} from '../models/page';
import {ProductFilters} from '../models/product-filters';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/products';

  getProducts(
    page = 0,
    size = 12,
    filters?: ProductFilters
  ): Observable<PageResponse<Product>> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);

    if (filters?.category) {
      params = params.set('category', filters.category);
    }

    if (filters?.minPrice !== null && filters?.minPrice !== undefined) {
      params = params.set('minPrice', filters.minPrice);
    }

    if (filters?.maxPrice !== null && filters?.maxPrice !== undefined) {
      params = params.set('maxPrice', filters.maxPrice);
    }

    if (filters?.sort) {
      params = params.set('sort', filters.sort);
    }

    return this.http.get<PageResponse<Product>>(this.apiUrl, { params });
  }

  getProductBySlug(slug: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${slug}`);
  }
}
