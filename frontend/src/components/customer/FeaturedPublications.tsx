import { Link } from "react-router-dom";
import { Eye, ShoppingCart, Star } from "lucide-react";
import { publicationService } from "../../services/publicationService";

import { useEffect, useState } from "react";
import type { Publication } from "../../types/publication";

export default function FeaturedPublications() {

  const [publications, setPublications] = useState<Publication[]>([]);

  async function loadFeatured() {
    const data = await publicationService.getFeatured();
    setPublications(data);
  }

    useEffect(() => {
    loadFeatured();
  }, []);


  return (
    <section className="py-20 bg-white">
      <div className="mx-auto max-w-7xl px-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-4xl font-bold text-[#003366]">
            Featured Publications
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
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
              <div className="relative overflow-hidden bg-gray-100">
                <img
                  src={publication.cover_image || "/DefaultBook.jpg"}
                  alt={publication.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />
            
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
              <div className="p-6">
                <h3 className="line-clamp-2 text-xl font-bold text-[#003366]">
                  {publication.title}
                </h3>

                <p className="mt-2 text-sm text-gray-500">
                  {"CSIR-NIScPR"}
                </p>

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

                <div className="mt-4 line-clamp-2 text-sm text-gray-600">
                  {publication.description}
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-600">
                    {publication.price}
                  </span>

                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Stock : {publication.stock}
                  </span>
                </div>

                <div className="mt-6 flex gap-3">
                  <Link
                    to={`/customer/book/${publication.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#003366] py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                  >
                    <Eye size={18} />
                    Details
                  </Link>

                  <button className="rounded-xl bg-[#003366] px-5 text-white transition hover:bg-[#002855]">
                    <ShoppingCart size={20} />
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