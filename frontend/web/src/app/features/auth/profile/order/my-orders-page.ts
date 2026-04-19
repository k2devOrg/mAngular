import { CommonModule, DatePipe, DecimalPipe } from '@angular/common';
import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService} from '../../../shop/services/order-service';
import { OrderResponse} from '../../../shop/models/order-response';
import { AuthService} from '../../../../core/auth/authService';

@Component({
  selector: 'app-my-orders-page',
  standalone: true,
  imports: [CommonModule, DatePipe, DecimalPipe],
  templateUrl: './my-orders-page.html',
})
export class MyOrdersPageComponent implements OnInit {
  private readonly orderService = inject(OrderService);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  readonly orders = signal<OrderResponse[]>([]);
  readonly loading = signal(false);
  readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.loading.set(true);
    this.error.set(null);

    this.orderService.getMyOrders().subscribe({
      next: (orders) => {
        this.orders.set(orders);
        this.loading.set(false);
      },
      error: (err) => {
        if (err.status === 401) {
          this.authService.logout();
          this.router.navigate(['/auth'], { queryParams: { mode: 'login' } }).then();
          return;
        }

        this.error.set('Nie udało się pobrać zamówień.');
        this.loading.set(false);
      },
    });
  }

  trackByOrderId(_: number, order: OrderResponse): number {
    return order.id;
  }
}
