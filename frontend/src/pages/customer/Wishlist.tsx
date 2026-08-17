import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import type { Publication } from "../../types/publication";

import { customerDataService } from "../../services/customerDataService";
import { publicationService } from "../../services/publicationService";
import { Empty } from "./Cart";

export default function Wishlist() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);


  async function loadWishlist() {
    try {
      const ids = customerDataService.getWishlist();

      const items = await Promise.all(
        ids.map(async (id) => {
          try {
            return await publicationService.getById(id);
          } catch {
            return null;
          }
        })
      );

      setPublications(
        items.filter(
          (item): item is Publication => item !== null
        )
      );
    } catch (error) {
      console.error(
        "Failed to load wishlist:",
        error
      );
    } finally {
      setLoading(false);
    }
  }

useEffect(() => {
  loadWishlist();
}, []);

  async function handleRemove(id: string) {
    customerDataService.toggleWishlist(id);
    await loadWishlist();
  }

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-6 py-12">
        <h1 className="text-3xl font-bold text-[#003366]">
          Wishlist
        </h1>

        <div className="mt-10 text-center">
          Loading...
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <h1 className="text-3xl font-bold text-[#003366]">
        Wishlist
      </h1>

      {publications.length === 0 ? (
        <Empty message="Your wishlist is empty." />
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {publications.map((item) => (
            <article
              key={item.id}
              className="rounded-2xl border bg-white p-5 shadow-sm"
            >
              <h2 className="font-semibold text-[#003366]">
                {item.title}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {item.author ?? "Unknown Author"}
              </p>

              <p className="mt-3 font-semibold text-green-700">
                ₹{item.price}
              </p>

              <div className="mt-4 flex gap-4">
                <Link
                  to={`/customer/book/${item.id}`}
                  className="text-sm font-medium text-[#003366] hover:underline"
                >
                  View
                </Link>

                <button
                  onClick={() => handleRemove(item.id)}
                  className="text-sm text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}