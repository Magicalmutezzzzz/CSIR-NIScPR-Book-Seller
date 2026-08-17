import { useEffect, useState } from "react";

import BookCard from "../../components/customer/BookCard";
import type { Publication } from "../../types/publication";
import { publicationService } from "../../services/publicationService";

export default function Research() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadResearch() {
      try {
        // Since there is no getResearch() service,
        // use all publications for now.
        const data = await publicationService.getAll();

        setPublications(data);
      } catch (error) {
        console.error(
          "Failed to load research publications:",
          error
        );
      } finally {
        setLoading(false);
      }
    }

    loadResearch();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">

      <section className="bg-[#003366] px-6 py-16 text-white">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-4xl font-bold">
            Research Articles
          </h1>

          <p className="mt-3 text-blue-100">
            Research articles published by
            CSIR-NIScPR.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 py-12">

        {loading ? (
          <div className="rounded-3xl bg-white p-14 text-center shadow">
            Loading...
          </div>
        ) : publications.length === 0 ? (
          <div className="rounded-3xl bg-white p-14 text-center text-gray-500 shadow">
            No research articles available.
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {publications.map((item) => (
              <BookCard
                key={item.id}
                id={item.id}
                title={item.title}
                author={item.author ?? "Unknown Author"}
                category={
                  item.categories
                    ?.map((c) => c.name)
                    .join(", ") ?? "General"
                }
                image={
                  item.cover_image ||
                  "/DefaultBook.jpg"
                }
                price={item.price}
                stock={item.stock}
                year={
                  item.publication_date
                    ? new Date(
                        item.publication_date
                      ).getFullYear()
                    : undefined
                }
              />
            ))}
          </div>
        )}

      </div>
    </main>
  );
}