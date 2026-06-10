export interface Service {
  id: string;
  name: string;
  category: string;
  description: string;
  duration_minutes: number;
  price: number;
  priceLabel?: string;
  is_active: boolean;
}
