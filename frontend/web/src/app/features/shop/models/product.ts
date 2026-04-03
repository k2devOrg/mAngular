export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  price: number;
  currency: string;
  stockQuantity: number;
  active: boolean;
  categoryName: string;
  categorySlug: string;
  imageUrl: string;
}
