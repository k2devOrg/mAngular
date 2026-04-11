import { Component, computed, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CheckoutService} from '../../services/checkout-service';

@Component({
  selector: 'app-order-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success-page.html',
  styleUrls: ['./order-success-page.css'],
})
export class OrderSuccessPageComponent {

  private readonly checkoutService = inject(CheckoutService);

  readonly placedOrder = this.checkoutService.placedOrder;
  readonly hasPlacedOrder = computed(() => this.placedOrder() !== null);
}
