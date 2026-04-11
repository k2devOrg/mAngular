import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-success-page',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './order-success-page.html',
  styleUrls: ['./order-success-page.css'],
})
export class OrderSuccessPageComponent {}
