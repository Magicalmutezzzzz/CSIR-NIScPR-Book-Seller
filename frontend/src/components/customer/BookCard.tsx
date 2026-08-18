import { Link } from "react-router-dom";
import { ShoppingCart, Eye, Heart } from "lucide-react";
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
  price,
  image,
  category,
  stock,
  year,
}: Props) {
  const wished = customerDataService.getWishlist().includes(id);
  return (
    <div className="mx-auto w-[250px] overflow-hidden rounded-2xl bg-white shadow transition hover:shadow-lg">
      {/* Image */}
      <div className="flex h-[360px] items-center justify-center bg-gray-100 p-3">
        <img
          src={image}
          alt={title}
          className="h-full w-auto object-contain transition duration-300 group-hover:scale-105"
        />

        {stock !== undefined && (
          <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
            {stock} in Stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-[#003366]">
            {category}
          </span>

          {year && (
            <span className="text-xs text-gray-500">{year}</span>
          )}
        </div>

        <h3 className="line-clamp-2 text-lg font-bold text-[#003366]">
          {title}
        </h3>

        <p className="text-sm text-gray-500">{author}</p>

        <div className="flex items-center justify-between pt-4">
          <span className="text-2xl font-bold text-green-600">
            {price}
          </span>

          <div className="flex gap-2">
            <Link
              to={`/customer/book/${id}`}
              className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
            >
              <Eye size={18} />
            </Link>

            <button onClick={() => { customerDataService.toggleWishlist(id); window.location.reload(); }} aria-label="Toggle wishlist" className={`rounded-lg border p-2 transition ${wished ? "border-red-200 bg-red-50 text-red-600" : "border-gray-300 hover:bg-gray-100"}`}>
              <Heart size={18} className={wished ? "fill-current" : ""} />
            </button>

            <button onClick={() => customerDataService.addToCart(id)} aria-label="Add to cart" className="rounded-lg bg-[#003366] p-2 text-white transition hover:bg-[#002855]">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
