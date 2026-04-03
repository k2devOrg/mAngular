import {Component, input, output} from '@angular/core';
import {Product} from '../models/product';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
})
export class ProductCardComponent {

  product = input.required<Product>();
  clicked = output<string>();

  cardClicked() {
    this.clicked.emit(this.product().slug);
  }
}
