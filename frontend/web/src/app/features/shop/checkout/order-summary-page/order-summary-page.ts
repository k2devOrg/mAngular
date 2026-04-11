import {Component, computed, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router, RouterLink} from '@angular/router';
import {CheckoutService} from '../../services/checkout-service';
import {CartService} from '../../../../core/cart/cart-service';

@Component({
  selector: 'app-order-summary-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-summary-page.html',
  styleUrls: ['./order-summary-page.css'],
})
export class OrderSummaryPageComponent {

  private readonly checkoutService = inject(CheckoutService);
  private readonly cartService = inject(CartService);
  private readonly router = inject(Router);

  readonly summary = this.checkoutService.checkoutSummary;

  readonly hasSummary = computed(() => this.summary() !== null);

  constructor() {
    console.log('order summary sees:', this.summary());
  }

  confirmOrder(): void {
    this.cartService.clear();
    this.checkoutService.clearSummary();
    this.router.navigate(['/shop/order-success']).then();
  }
}
