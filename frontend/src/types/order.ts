import type { Publication } from "./publication";
import type { Address } from "./address";

export type OrderStatus =
  | "REQUEST_SENT"
  | "INVOICE_SENT"
  | "PAYMENT_RECEIVED"
  | "SHIPPED"
  | "DELIVERED";

export interface OrderItem {
  id: number;
  publication: Publication;
 quantity: number;
  price: number;
}

export interface Order {

  id: string;

  customerEmail: string;

  customerName: string;

  items: OrderItem[];

  booksTotal: number;

  postalCharges: number;

  gst?: number;

  grandTotal: number;

  invoiceNumber?: string;

  invoiceSent: boolean;

  paymentVerified: boolean;

  courier?: string;

  trackingNumber?: string;

  shippedAt?: string;

  shippingAddress: Address;

  deliveredAt?: string;

  expectedDelivery?: string;

  status: OrderStatus;

  createdAt: string;

}