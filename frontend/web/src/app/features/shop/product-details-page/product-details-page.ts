import {Component, inject, signal} from '@angular/core';
import {ActivatedRoute, RouterLink} from '@angular/router';
import {Product} from '../models/product';
import {RevealOnScroll} from '../../../shared/directives/reveal-on-scroll';
import {CartService} from '../../../core/cart/cart-service';

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
export class ProductDetailsPageComponent {

  cartService: CartService = inject(CartService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  productIdUrl: string | null = this.activatedRoute.snapshot.paramMap.get('id');
  activeImageIndex = signal(0);
  productList = [
    {
      id: 1,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-01.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-01.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
      ]
    },
    {
      id: 2,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-02.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
    {
      id: 3,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-03.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
    {
      id: 4,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-04.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-04.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
    {
      id: 5,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-05.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-05.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
    {
      id: 6,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-06.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-06.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
    {
      id: 7,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-07.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-01.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
    {
      id: 8,
      imgUrl: "https://tailwindcss.com/plus-assets/img/ecommerce-images/category-page-07-product-08.jpg",
      title: 'To jest karta pokemon',
      category: 'Pokemon',
      subTitle: 'PokemonCard',
      price: 10,
      images: [
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-01.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-02.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-03.jpg',
        'https://tailwindcss.com/plus-assets/img/ecommerce-images/product-page-03-product-04.jpg',
      ]
    },
  ]
  productId: number | null = Number(this.productIdUrl);
  product?: Product = this.productList.find(p => p.id === this.productId);
  setActiveImage(index: number) {
    this.activeImageIndex.set(index);
  }
}
