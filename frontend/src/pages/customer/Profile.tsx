import { getAuthenticatedUser } from "../../services/authService";
import { customerDataService } from "../../services/customerDataService";

export default function Profile() {
  const user = getAuthenticatedUser();
  const cartCount = customerDataService.getCart().reduce((sum, item) => sum + item.quantity, 0);
  const wishlistCount = customerDataService.getWishlist().length;
  return <main className="mx-auto max-w-3xl px-6 py-12"><h1 className="text-3xl font-bold text-[#003366]">My account</h1><div className="mt-8 rounded-3xl border bg-white p-7 shadow-sm"><h2 className="text-xl font-semibold text-[#003366]">Customer profile</h2><dl className="mt-6 grid gap-5 sm:grid-cols-2"><div><dt className="text-sm text-gray-500">Email</dt><dd className="mt-1 font-medium">{user?.email}</dd></div><div><dt className="text-sm text-gray-500">Role</dt><dd className="mt-1 font-medium capitalize">{user?.role}</dd></div><div><dt className="text-sm text-gray-500">Cart items</dt><dd className="mt-1 font-medium">{cartCount}</dd></div><div><dt className="text-sm text-gray-500">Wishlist items</dt><dd className="mt-1 font-medium">{wishlistCount}</dd></div></dl></div></main>;
}
