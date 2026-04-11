import { Injectable, signal } from '@angular/core';
import { CheckoutSummaryData } from '../models/checkout-data';
import { OrderResponse } from '../models/order-response';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  private readonly summaryData = signal<CheckoutSummaryData | null>(null);
  private readonly placedOrderData = signal<OrderResponse | null>(null);

  readonly checkoutSummary = this.summaryData.asReadonly();
  readonly placedOrder = this.placedOrderData.asReadonly();

  setSummary(data: CheckoutSummaryData): void {
    this.summaryData.set(data);
  }

  clearSummary(): void {
    this.summaryData.set(null);
  }

  setPlacedOrder(order: OrderResponse): void {
    this.placedOrderData.set(order);
  }

  clearPlacedOrder(): void {
    this.placedOrderData.set(null);
  }

  clearAll(): void {
    this.summaryData.set(null);
    this.placedOrderData.set(null);
  }
}
