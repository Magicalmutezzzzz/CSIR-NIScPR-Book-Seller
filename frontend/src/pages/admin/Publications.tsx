import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { publicationService } from "../../services/publicationService";
import type {
  Publication,
} from "../../types/publication";

interface PublicationsProps {
  typeFilter?: string;
}

export default function Publications({
  typeFilter,
}: PublicationsProps) {
  const [publications, setPublications] = useState<Publication[]>([]);

  const title = typeFilter
    ? `${typeFilter} Publications`
    : "Publications";

  useEffect(() => {
    loadPublications();
  }, [typeFilter]);

  async function loadPublications() {
    try {
      const data = await publicationService.getAll();

      if (typeFilter) {
        setPublications(
          data.filter(
            (item) =>
              item.publication_type?.name === typeFilter
          )
        );
      } else {
        setPublications(data);
      }
    } catch (error) {
      console.error(
        "Failed to load publications:",
        error
      );
    }
  }

  async function handleDelete(id: string) {
    if (
      !window.confirm(
        "Delete this publication?"
      )
    ) {
      return;
    }

    try {
      await publicationService.delete(id);

      await loadPublications();
    } catch (error) {
      console.error(
        "Failed to delete publication:",
        error
      );
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#003366]">
            {title}
          </h1>

          <p className="mt-2 text-gray-500">
            Create and manage the customer
            catalogue.
          </p>
        </div>

        <Link
          to="/admin/publications/add"
          className="rounded-xl bg-[#003366] px-5 py-3 font-medium text-white hover:bg-[#002855]"
        >
          Add Publication
        </Link>
      </div>

      {publications.length === 0 ? (
        <div className="rounded-3xl border bg-white p-14 text-center shadow-sm">
          <h2 className="text-xl font-semibold text-[#003366]">
            No publications found
          </h2>

          <p className="mt-2 text-gray-500">
            Use "Add Publication" to create
            your catalogue.
          </p>
        </div>
      ) : (
        <div className="overflow-hidden rounded-3xl border bg-white shadow-sm">
          <table className="min-w-full text-left">
            <thead className="bg-slate-50 text-sm text-[#003366]">
              <tr>
                <th className="px-6 py-4">
                  Title
                </th>
                <th className="px-6 py-4">
                  Type
                </th>
                <th className="px-6 py-4">
                  Category
                </th>
                <th className="px-6 py-4">
                  Price
                </th>
                <th className="px-6 py-4">
                  Stock
                </th>
                <th className="px-6 py-4">
                  Action
                </th>
              </tr>
            </thead>

            <tbody className="divide-y">
              {publications.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 font-medium">
                    {item.title}

                    <p className="text-sm font-normal text-gray-500">
                      {item.author}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {item.publication_type?.name ?? "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.categories?.map((c) => c.name).join(", ") ?? "-"}
                  </td>

                  <td className="px-6 py-4">
                    {item.price}
                  </td>

                  <td className="px-6 py-4">
                    {item.stock}
                  </td>

                  <td className="px-6 py-4">
                    <button
                      onClick={() =>
                        handleDelete(
                          String(item.id)
                        )
                      }
                      className="text-sm font-medium text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}