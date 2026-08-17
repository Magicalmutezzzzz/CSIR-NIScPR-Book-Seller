import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { publicationService } from "../../services/publicationService";
import type { Publication } from "../../types/publication";

export default function Featured() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const data = await publicationService.getFeatured();
        setPublications(data);
      } catch (error) {
        console.error("Failed to load featured publications:", error);
        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    loadFeatured();
  }, []);

  if (loading) {
    return (
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <p className="text-center text-gray-500">
            Loading featured publications...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-4xl font-bold text-[#003366]">
              Featured Publications
            </h2>

            <p className="mt-2 text-gray-500">
              Selections made by the publication team.
            </p>
          </div>

          <Link
            to="/customer/books"
            className="rounded-xl bg-[#003366] px-5 py-3 text-white hover:bg-[#002855]"
          >
            View Catalogue
          </Link>
        </div>

        {publications.length === 0 ? (
          <p className="mt-12 rounded-3xl bg-slate-50 p-10 text-center text-gray-500">
            No featured publications have been selected yet.
          </p>
        ) : (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {publications.map((item: Publication) => (
              <Link
                key={item.id}
                to={`/customer/book/${item.id}`}
                className="rounded-2xl border bg-white p-5 shadow-sm transition hover:shadow-lg"
              >
                <img
                  src={item.cover_image || "/DefaultBook.jpg"}
                  alt={item.title}
                  className="mb-4 h-60 w-full rounded-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/DefaultBook.jpg";
                  }}
                />

                <h3 className="line-clamp-2 text-lg font-bold text-[#003366]">
                  {item.title}
                </h3>

                <p className="mt-2 text-sm text-gray-600">
                  {item.author || "Unknown Author"}
                </p>

                <p className="mt-4 text-xl font-semibold text-green-600">
                  ₹{item.price}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}