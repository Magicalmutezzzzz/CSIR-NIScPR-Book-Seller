import { useMemo, useState } from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Package,
} from "lucide-react";
import PublicationStatusBadge from "./PublicationStatusBadge";

import type { Publication } from "../../../types/publication";
interface PublicationTableProps {
  publications: Publication[];

  onView: (publication: Publication) => void;

  onEdit: (publication: Publication) => void;

  onDelete: (publication: Publication) => void;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export default function PublicationTable({
  publications,
  onView,
  onEdit,
  onDelete,
}: PublicationTableProps) {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);

  const allSelected = useMemo(() => {
    return (
      publications.length > 0 &&
      selectedRows.length === publications.length
    );
  }, [publications, selectedRows]);

  const toggleRow = (id: string) => {
    setSelectedRows((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (allSelected) {
      setSelectedRows([]);
      return;
    }

    setSelectedRows(publications.map((p) => p.id));
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-200 shadow-md overflow-hidden">

      {/* Header */}

      <div className="flex items-center justify-between border-b border-gray-200 px-6 py-5">

        <div>

          <h2 className="text-xl font-bold text-[#003366]">
            Publications
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Total Records : {publications.length}
          </p>

        </div>

        {selectedRows.length > 0 && (

          <div className="text-sm font-medium text-[#003366]">

            {selectedRows.length} selected

          </div>

        )}

      </div>

      {/* Desktop Table */}

      <div className="hidden lg:block overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-gray-50">

            <tr>

              <th className="px-5 py-4">

                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                />

              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Publication
              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Type
              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Category
              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Price
              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Stock
              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Status
              </th>

              <th className="text-left px-5 py-4 font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {publications.map((publication) => (

              <tr
                key={publication.id}
                className="border-t hover:bg-gray-50 transition"
              >

                <td className="px-5 py-5">

                  <input
                    type="checkbox"
                    checked={selectedRows.includes(publication.id)}
                    onChange={() => toggleRow(publication.id)}
                  />

                </td>

                <td className="px-5 py-5">

                  <div className="flex items-center gap-4">

                    <img
                      src={publication.cover_image || "placeholder-book.png"}
                      alt={publication.title}
                      className="w-14 h-20 rounded-lg object-cover border"
                    />

                    <div>

                      <h3 className="font-semibold text-gray-800">
                        {publication.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        Added {publication.publication_date || "-"}
                      </p>

                    </div>

                  </div>

                </td>

                <td className="px-5 py-5">
                  {publication.publication_type?.name || "-"}
                </td>

                <td className="px-5 py-5">
                  {publication.categories?.map(c => c.name).join(", ") || "-"}
                </td>

                <td className="px-5 py-5 font-semibold">

                  {formatCurrency(publication.price)}

                </td>
                                

                <td className="px-5 py-5">

                  <div className="flex items-center gap-2">

                    <Package
                      size={16}
                      className="text-blue-600"
                    />

                    <span>{publication.stock}</span>

                  </div>

                </td>

                <td className="px-5 py-5">
                  <PublicationStatusBadge
                      status={
                          publication.is_active
                              ? "Published"
                              : "Archived"
                      }
                  />
                </td>

                <td className="px-5 py-5">

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() => onView(publication)}
                      className="p-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition"
                      title="View"
                    >
                      <Eye size={18} />
                    </button>

                    <button
                      onClick={() => onEdit(publication)}
                      className="p-2 rounded-lg bg-yellow-50 text-yellow-700 hover:bg-yellow-100 transition"
                      title="Edit"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      onClick={() => onDelete(publication)}
                      className="p-2 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition"
                      title="Delete"
                    >
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Mobile Layout */}

      <div className="lg:hidden p-4 space-y-4">

        {publications.map((publication) => (

          <div
            key={publication.id}
            className="border rounded-2xl p-4 shadow-sm hover:shadow-md transition"
          >

            <div className="flex gap-4">

              <img
                src={publication.cover_image || "/placeholder-book.png"}
                alt={publication.title}
                className="w-20 h-28 object-cover rounded-lg border"
              />

              <div className="flex-1">

                <div className="flex justify-between items-start gap-3">

                  <h3 className="font-bold text-[#003366] leading-tight">
                    {publication.title}
                  </h3>

                  <PublicationStatusBadge
                    status={
                        publication.is_active
                            ? "Published"
                            : "Archived"
                    }
                />

                </div>

                <p className="text-sm text-gray-500 mt-2">
                  {publication.publication_type?.name || "-"}
                </p>

                <p className="text-sm text-gray-500">
                  {publication.categories?.map((c) => c.name).join(", ") || "-"}
                </p>

                <div className="mt-3 space-y-1 text-sm">

                  <p>
                    <strong>Price:</strong>{" "}
                    {formatCurrency(publication.price)}
                  </p>

                  <p>
                    <strong>Stock:</strong>{" "}
                    {publication.stock}
                  </p>

                </div>

                <div className="flex gap-2 mt-5">

                  <button
                    onClick={() => onView(publication)}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    View
                  </button>

                  <button
                    onClick={() => onEdit(publication)}
                    className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => onDelete(publication)}
                    className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>

          </div>

        ))}

      </div>
            {/* Empty State */}

      {publications.length === 0 && (

        <div className="py-20 text-center">

          <Package
            size={60}
            className="mx-auto text-gray-300 mb-5"
          />

          <h3 className="text-xl font-semibold text-gray-700">
            No Publications Found
          </h3>

          <p className="text-gray-500 mt-2">
            Try changing your search or filters.
          </p>

        </div>

      )}

      {/* Footer */}

      {publications.length > 0 && (

        <div className="border-t bg-gray-50 px-6 py-4">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

            <div className="text-sm text-gray-600">

              Showing

              <span className="font-semibold mx-1">
                {publications.length}
              </span>

              publication{publications.length > 1 ? "s" : ""}

            </div>

            <div className="flex items-center gap-4">

              <span className="text-sm text-gray-600">

                Selected:

                <span className="font-semibold ml-1 text-[#003366]">
                  {selectedRows.length}
                </span>

              </span>

              {selectedRows.length > 0 && (

                <button
                  onClick={() => setSelectedRows([])}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear Selection
                </button>

              )}

            </div>

          </div>

        </div>

      )}

    </div>

  );
}
