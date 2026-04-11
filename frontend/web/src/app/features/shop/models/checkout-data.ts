import { CartItem } from './cart-item';

export interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  paymentMethod: string;
}

export interface CheckoutSummaryData {
  customer: CheckoutFormData;
  items: CartItem[];
  totalPrice: number;
}
