import { getAuthenticatedUser } from "./authService";

export interface CartItem { publicationId: number; quantity: number }

function key(name: string): string {
  const user = getAuthenticatedUser();
  return `nispr-${name}-${user?.email ?? "guest"}`;
}

function read<T>(name: string, fallback: T): T {
  try { return JSON.parse(localStorage.getItem(key(name)) ?? "") as T; } catch { return fallback; }
}

function write<T>(name: string, value: T): void {
  localStorage.setItem(key(name), JSON.stringify(value));
  window.dispatchEvent(new Event("nispr-customer-data"));
}

export const customerDataService = {
  getCart: () => read<CartItem[]>("cart", []),
  addToCart: (publicationId: number) => {
    const cart = customerDataService.getCart();
    const item = cart.find((entry) => entry.publicationId === publicationId);
    write("cart", item ? cart.map((entry) => entry.publicationId === publicationId ? { ...entry, quantity: entry.quantity + 1 } : entry) : [...cart, { publicationId, quantity: 1 }]);
  },
  updateQuantity: (publicationId: number, quantity: number) => write("cart", customerDataService.getCart().flatMap((item) => item.publicationId !== publicationId ? [item] : quantity > 0 ? [{ ...item, quantity }] : [])),
  removeFromCart: (publicationId: number) => write("cart", customerDataService.getCart().filter((item) => item.publicationId !== publicationId)),
  getWishlist: () => read<number[]>("wishlist", []),
  toggleWishlist: (publicationId: number) => {
    const wishlist = customerDataService.getWishlist();
    write("wishlist", wishlist.includes(publicationId) ? wishlist.filter((id) => id !== publicationId) : [...wishlist, publicationId]);
  },
};
