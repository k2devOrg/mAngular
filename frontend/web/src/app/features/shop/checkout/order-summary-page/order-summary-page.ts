import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CheckoutService} from '../../services/checkout-service';
import { CartService} from '../../../../core/cart/cart-service';
import { OrderService} from '../../services/order-service';
import { CreateOrderRequest} from '../../models/create-order-request';

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
  private readonly orderService = inject(OrderService);
  private readonly router = inject(Router);

  readonly summary = this.checkoutService.checkoutSummary;
  readonly hasSummary = computed(() => this.summary() !== null);

  readonly isSubmitting = signal(false);
  readonly submitError = signal<string | null>(null);

  confirmOrder(): void {
    const summary = this.summary();

    if (!summary) {
      return;
    }

    const request: CreateOrderRequest = {
      email: summary.customer.email,
      firstName: summary.customer.firstName,
      lastName: summary.customer.lastName,
      phoneNumber: summary.customer.phoneNumber,
      street: summary.customer.street,
      postalCode: summary.customer.postalCode,
      city: summary.customer.city,
      country: summary.customer.country,
      paymentMethod: summary.customer.paymentMethod,
      items: summary.items.map(item => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    this.isSubmitting.set(true);
    this.submitError.set(null);

    this.orderService.createOrder(request).subscribe({
      next: (order) => {
        this.checkoutService.setPlacedOrder(order);
        this.cartService.clear();
        this.checkoutService.clearSummary();
        this.isSubmitting.set(false);
        this.router.navigate(['/shop/order-success']).then();
      },
      error: (error) => {
        console.error('create order error', error);
        this.submitError.set('Nie udało się złożyć zamówienia. Spróbuj ponownie.');
        this.isSubmitting.set(false);
      },
    });
  }
}
