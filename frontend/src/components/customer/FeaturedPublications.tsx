import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";

import { publicationService } from "../../services/publicationService";
import type { Publication } from "../../types/publication";

export default function FeaturedPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);

  useEffect(() => {
    async function loadFeatured() {
      const data = await publicationService.getFeatured();
      setPublications(data);
    }

    loadFeatured();
  }, []);

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#003366]">
            Featured Publications
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-600">
            Discover the latest books, journals, magazines and research
            publications published by CSIR–NIScPR.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {publications.map((publication) => (
            <div
              key={publication.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Image */}
              <div className="relative">
                <Link
                  to={`/customer/book/${publication.id}`}
                  className="flex h-80 items-center justify-center bg-gray-100 p-4"
                >
                  <img
                    src={publication.cover_image || "/DefaultBook.jpg"}
                    alt={publication.title}
                    className="h-full w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>

                {/* Featured Badge */}
                <span className="absolute left-4 top-4 rounded-full bg-yellow-400 px-3 py-1 text-xs font-bold text-black shadow">
                  Featured
                </span>

                {/* Publication Type */}
                <span className="absolute bottom-4 left-4 rounded-full bg-[#003366] px-3 py-1 text-xs font-semibold text-white">
                  {publication.publication_type?.name}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-col p-6">
                <Link
                  to={`/customer/book/${publication.id}`}
                  className="line-clamp-2 text-xl font-bold text-[#003366] transition hover:text-blue-700 hover:underline"
                >
                  {publication.title}
                </Link>

                <p className="mt-2 text-sm text-gray-500">
                  CSIR–NIScPR
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={16}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}

                  <span className="ml-2 text-sm text-gray-500">
                    5.0
                  </span>
                </div>

                {/* Description */}
                <p className="mt-4 line-clamp-2 text-sm text-gray-600">
                  {publication.description}
                </p>

                {/* Price & Stock */}
                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    ₹{Number(publication.price).toFixed(2)}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Stock: {publication.stock}
                  </span>
                </div>

                {/* Cart Button */}
                <div className="mt-6">
                  <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#003366] py-3 font-semibold text-white transition hover:bg-[#002855]">
                    <ShoppingCart size={20} />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Button */}
        <div className="mt-14 text-center">
          <Link
            to="/customer/books"
            className="inline-flex rounded-xl bg-[#003366] px-8 py-4 font-semibold text-white transition hover:bg-[#002855]"
          >
            View All Publications
          </Link>
        </div>
      </div>
    </section>
  );
}