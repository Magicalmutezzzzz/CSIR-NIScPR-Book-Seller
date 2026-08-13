import type { Publication } from "./publication";

export interface CartItem {
  id: string;
  publication: Publication;
  quantity: number;
  addedAt: string;
}

export interface CartSummary {
  items: CartItem[];
  totalItems: number;
  subtotal: number;
  shipping: number;
  gst: number;
  grandTotal: number;
}