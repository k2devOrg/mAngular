import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormBuilder, Validators} from '@angular/forms';
import {Router, RouterLink} from '@angular/router';
import {CartService} from '../../../../core/cart/cart-service';
import {CheckoutService} from '../../services/checkout-service';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './checkout-page.html',
  styleUrls: ['./checkout-page.css'],
})
export class CheckoutPageComponent {

  readonly cartService = inject(CartService);
  private readonly checkoutService = inject(CheckoutService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);

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

    const formValue = this.checkoutForm.getRawValue();

    this.checkoutService.setSummary({
      customer: {
        email: formValue.email ?? '',
        firstName: formValue.firstName ?? '',
        lastName: formValue.lastName ?? '',
        phoneNumber: formValue.phoneNumber ?? '',
        street: formValue.street ?? '',
        postalCode: formValue.postalCode ?? '',
        city: formValue.city ?? '',
        country: formValue.country ?? '',
        paymentMethod: formValue.paymentMethod ?? '',
      },
      items: this.cartService.cartItems(),
      totalPrice: this.cartService.totalPrice(),
    });

    this.router.navigate(['/shop/order-summary']).then();
  }
}
