import { useEffect, useState } from "react";
import { publicationService } from "../../services/publicationService";
import type { Publication } from "../../types/publication";

export default function RecentPublications() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPublications = async () => {
      try {
        const data = await publicationService.getAll();

        setPublications(data.slice(0, 5));
      } catch (error) {
        console.error(
          "Failed to load recent publications:",
          error
        );

        setPublications([]);
      } finally {
        setLoading(false);
      }
    };

    loadPublications();
  }, []);

  if (loading) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow">
        <h2 className="text-xl font-bold text-[#003366]">
          Recent Publications
        </h2>

        <p className="mt-4 text-gray-500">
          Loading publications...
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 shadow">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-[#003366]">
          Recent Publications
        </h2>

        <span className="text-sm text-gray-500">
          {publications.length} publication(s)
        </span>
      </div>

      {publications.length === 0 ? (
        <p className="mt-6 text-gray-500">
          No publications available.
        </p>
      ) : (
        <div className="mt-6 divide-y">
          {publications.map((publication) => (
            <div
              key={publication.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div className="min-w-0">
                <h3 className="truncate font-semibold text-[#003366]">
                  {publication.title}
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  {publication.publication_type_id}
                </p>
              </div>

              <div className="shrink-0 text-right">
                <p className="font-semibold text-[#003366]">
                  ₹{publication.price}
                </p>

                <p className="text-sm text-gray-500">
                  Stock: {publication.stock}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}