import { Injectable, signal } from '@angular/core';
import { CheckoutSummaryData } from '../models/checkout-data';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {

  private readonly debugId = Math.random().toString(36).slice(2);
  private readonly summaryData = signal<CheckoutSummaryData | null>(null);

  readonly checkoutSummary = this.summaryData.asReadonly();

  setSummary(data: CheckoutSummaryData): void {
    console.log('setSummary in service:', this.debugId, data);
    this.summaryData.set(data);
  }

  clearSummary(): void {
    console.log('clearSummary in service:', this.debugId);
    this.summaryData.set(null);
  }
}
