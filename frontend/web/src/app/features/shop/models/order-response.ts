export interface OrderItemResponse {
  productId: number | null;
  productName: string;
  productSlug: string;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface OrderResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  street: string;
  postalCode: string;
  city: string;
  country: string;
  paymentMethod: string;
  status: string;
  totalPrice: number;
  createdAt: string;
  items: OrderItemResponse[];
}
