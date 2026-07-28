import { Link } from "react-router-dom";
import { ShoppingCart, Eye } from "lucide-react";

type Props = {
  id: number;
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
  return (
    <div className="group overflow-hidden rounded-2xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* Image */}
      <div className="relative h-72 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {stock !== undefined && (
          <span className="absolute right-3 top-3 rounded-full bg-green-600 px-3 py-1 text-xs font-semibold text-white shadow">
            {stock} in Stock
          </span>
        )}
      </div>

      {/* Body */}
      <div className="space-y-3 p-5">
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

        <div className="flex items-center justify-between pt-2">
          <span className="text-2xl font-bold text-green-600">
            ₹{price}
          </span>

          <div className="flex gap-2">
            <Link
              to={`/customer/book/${id}`}
              className="rounded-lg border border-gray-300 p-2 transition hover:bg-gray-100"
            >
              <Eye size={18} />
            </Link>

            <button className="rounded-lg bg-[#003366] p-2 text-white transition hover:bg-[#002855]">
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}