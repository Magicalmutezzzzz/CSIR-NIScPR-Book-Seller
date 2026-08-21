import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { customerDataService } from "../../services/customerDataService";

type Props = {
  id: string;
  title: string;
  author: string;
  description?: string;
  price: number;
  image: string;
  category: string;
  stock?: number;
  year?: number;
  featured?: boolean;
};

export default function BookCard({
  id,
  title,
  author,
  description,
  price,
  image,
  stock,
  year,
}: Props) {
  const wished = customerDataService.getWishlist().includes(id);

  const handleWishlist = () => {
    customerDataService.toggleWishlist(id);

    // Temporary update
    // Ideally this should use React state instead of reload
    window.location.reload();
  };

  const handleAddToCart = () => {
    customerDataService.addToCart(id);
  };

  return (
    <div className="group mx-auto flex h-full w-[250px] flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* Image */}
      <div className="relative">
        <Link
          to={`/customer/book/${id}`}
          className="flex h-[340px] items-center justify-center bg-gray-100 p-3"
        >
          <img
            src={image || "/DefaultBook.jpg"}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = "/DefaultBook.jpg";
            }}
            className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
          />
        </Link>

        {stock !== undefined && (
          <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
            {stock} in Stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">

        <div className="flex items-center justify-between">

          {year && (
            <span className="text-xs text-gray-500">
              {year}
            </span>
          )}
        </div>

        <Link
          to={`/customer/book/${id}`}
          className="mt-3 line-clamp-2 text-lg font-bold text-[#003366] transition hover:text-blue-700 hover:underline"
        >
          {title}
        </Link>

        <p className="mt-2 text-sm text-gray-500">
          {author}
        </p>

        {/* Description */}
        <p className="mt-3 line-clamp-3 min-h-[60px] text-sm text-gray-600">
          {description || "No description available."}
        </p>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-xl font-bold text-[#003366]">
            ₹{Number(price).toFixed(2)}
          </span>

          <div className="flex items-center gap-2">

            <button
              type="button"
              onClick={handleWishlist}
              className={`rounded-lg border p-2 transition ${
                wished
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
              title="Wishlist"
            >
              <Heart
                size={18}
                className={wished ? "fill-current" : ""}
              />
            </button>

            <button
              type="button"
              onClick={handleAddToCart}
              className="rounded-lg bg-[#003366] p-2 text-white transition hover:bg-[#002855]"
              title="Add to Cart"
            >
              <ShoppingCart size={18} />
            </button>

          </div>
        </div>
      </div>
    </div>
  );
}