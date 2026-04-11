import {Component, inject} from '@angular/core';
import {Router, RouterLink} from '@angular/router';
import {CartService} from '../../../../core/cart/cart-service';
import {RevealOnScroll} from '../../../../shared/directives/reveal-on-scroll';

@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [RouterLink, RevealOnScroll],
  templateUrl: './cart-page.html',
  styleUrls: ['./cart-page.css'],
})
export class CartPageComponent {
  cartService: CartService = inject(CartService);
  private readonly router = inject(Router);

  goToCheckout(): void {
    this.router.navigate(['/checkout']).then(success => {
      if (!success) {
        console.error('Navigation failed');
      }
    });
  }
}
