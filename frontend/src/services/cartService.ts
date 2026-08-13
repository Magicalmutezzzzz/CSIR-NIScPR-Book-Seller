import type { Publication } from "../types/publication";
import type { CartItem, CartSummary } from "../types/cart";
import { getAuthenticatedUser } from "./authService";

function getStorageKey() {
  const user = getAuthenticatedUser();

  if (!user) {
    return "guest_cart";
  }

  return `customer_cart_${user.email}`;
}

class CartService {
  private save(items: CartItem[]) {
    localStorage.setItem(
      getStorageKey(),
      JSON.stringify(items),
    );
  }

  getItems(): CartItem[] {
    const data = localStorage.getItem(
      getStorageKey(),
    );

    return data ? JSON.parse(data) : [];
  }

  addToCart(publication: Publication) {
    const items = this.getItems();

    const existing = items.find(
      (item) =>
        item.publication.id === publication.id,
    );

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({
        id: publication.id,
        publication,
        quantity: 1,
        addedAt: new Date().toISOString(),
      });
    }

    this.save(items);
  }

  removeFromCart(publicationId: string) {
    this.save(
      this.getItems().filter(
        (item) =>
          item.publication.id !== publicationId,
      ),
    );
  }

  increaseQuantity(publicationId: string) {
    const items = this.getItems();

    const item = items.find(
      (item) =>
        item.publication.id === publicationId,
    );

    if (item) {
      item.quantity += 1;
    }

    this.save(items);
  }

  decreaseQuantity(publicationId: string) {
    const items = this.getItems();

    const item = items.find(
      (item) =>
        item.publication.id === publicationId,
    );

    if (!item) {
      return;
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
      this.save(items);
    } else {
      this.removeFromCart(publicationId);
    }
  }

  clearCart() {
    localStorage.removeItem(
      getStorageKey(),
    );
  }

  getCartCount() {
    return this.getItems().reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }

  getSummary(): CartSummary {
    const items = this.getItems();

    const subtotal = items.reduce(
      (sum, item) =>
        sum +
        Number(item.publication.price) *
          item.quantity,
      0,
    );

    const shipping =
      subtotal > 0 ? 100 : 0;

    const gst = subtotal * 0.18;

    return {
      items,
      totalItems: items.reduce(
        (sum, item) =>
          sum + item.quantity,
        0,
      ),
      subtotal,
      shipping,
      gst,
      grandTotal:
        subtotal + shipping + gst,
    };
  }
}

export const cartService =
  new CartService();