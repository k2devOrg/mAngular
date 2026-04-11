export interface CreateOrderItemRequest {
  productId: number;
  quantity: number;
}

export interface CreateOrderRequest {
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  paymentMethod: string;
  items: CreateOrderItemRequest[];
}
