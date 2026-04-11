import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {CartService} from '../../../../core/cart/cart-service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout-page.html',
  styleUrls: ['./checkout-page.css'],
})
export class CheckoutPageComponent {

  readonly cartService = inject(CartService);
  private readonly fb = inject(FormBuilder);

  readonly checkoutForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phoneNumber: [''],
    street: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
    city: ['', [Validators.required]],
    country: ['Polska', [Validators.required]],
    paymentMethod: ['card', [Validators.required]],
  });

  submitOrder(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    console.log('checkout payload', {
      customer: this.checkoutForm.value,
      items: this.cartService.cartItems(),
      totalPrice: this.cartService.totalPrice(),
    });
  }
}
