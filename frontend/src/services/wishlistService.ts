import { getAuthenticatedUser } from "./authService";
import type { Publication } from "../types/publication";

function getStorageKey() {
  const user = getAuthenticatedUser();

  if (!user) return "guest_wishlist";

  return `customer_wishlist_${user.email}`;
}

class WishlistService {
  getItems(): Publication[] {
    const data = localStorage.getItem(getStorageKey());
    return data ? JSON.parse(data) : [];
  }

  isInWishlist(id: string) {
    return this.getItems().some((item) => item.id === id);
  }

  toggle(publication: Publication) {
    const items = this.getItems();

    const exists = items.find((item) => item.id === publication.id);

    if (exists) {
      localStorage.setItem(
        getStorageKey(),
        JSON.stringify(items.filter((item) => item.id !== publication.id))
      );
    } else {
      items.push(publication);
      localStorage.setItem(getStorageKey(), JSON.stringify(items));
    }
  }

  count() {
    return this.getItems().length;
  }
}

export const wishlistService = new WishlistService();