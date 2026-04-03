import {computed, effect, inject, Injectable, signal} from '@angular/core';
import {CartItem} from '../../features/shop/models/cart-item';
import {Product} from '../../features/shop/models/product';
import {ModalService} from '../modal/modal-service';

const CART_STORAGE_KEY = 'cart_items';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  protected modalService: ModalService = inject(ModalService);
  private readonly items = signal<CartItem[]>([]);
  readonly cartItems = this.items.asReadonly();

  totalItems = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity, 0)
  );

  totalPrice = computed(() =>
    this.cartItems().reduce((sum, item) => sum + item.quantity * item.price, 0)
  );

  constructor() {
    const stored = localStorage.getItem(CART_STORAGE_KEY);

    if (stored) {
      try {
        this.items.set(JSON.parse(stored) as CartItem[]);
      } catch {
        localStorage.removeItem(CART_STORAGE_KEY);
      }
    }

    effect(() => {
      this.saveToStorage(this.items());
    });
  }

  add(product: Product) {
    this.items.update(items => {
      const existing = items.find(item => item.productId === product.id);

      if (!existing) {
        const newCartItem: CartItem = {
          productId: product.id,
          title: product.name,
          price: product.price,
          imgUrl: product.imageUrl,
          quantity: 1,
        };
        return [...items, newCartItem];
      }
      return items.map(item =>
        item.productId === product.id
          ? {...item, quantity: item.quantity + 1}
          : item
      );
    });
    this.modalService.open('ADD_TO_CART', {
      title: product.name,
      price: product.price,
      imgUrl: product.imageUrl,
      quantity: 1,
    })
  }

  remove(productId: number) {
    this.items.update(items =>
      items.filter(item =>
        item.productId !== productId)
    );
  }

  increase(productId: number) {
    this.items.update(items =>
      items.map(item =>
        item.productId === productId ?
          {...item, quantity: item.quantity + 1} : item));
  }

  decrease(productId: number) {
    this.items.update(items =>
      items
        .map(item =>
          item.productId === productId ?
            {...item, quantity: item.quantity - 1} : item
        )
        .filter(item => item.quantity > 0));
  }

  clear() {
    this.items.set([]);
  }

  private saveToStorage(items: CartItem[]) {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }
}
