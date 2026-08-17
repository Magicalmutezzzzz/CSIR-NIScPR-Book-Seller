import { Trash2, X, AlertTriangle } from "lucide-react";
import type { Publication } from "../../../types/publication";

interface DeletePublicationModalProps {
  open: boolean;
  publication: Publication | null;
  onClose: () => void;
  onDelete: (publication: Publication) => void;
}

export default function DeletePublicationModal({
  open,
  publication,
  onClose,
  onDelete,
}: DeletePublicationModalProps) {
  if (!open || !publication) return null;

  const handleDelete = () => {
    onDelete(publication);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="w-full max-w-lg rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="rounded-full bg-red-100 p-3">

              <AlertTriangle
                size={24}
                className="text-red-600"
              />

            </div>

            <div>

              <h2 className="text-xl font-bold text-[#003366]">
                Delete Publication
              </h2>

              <p className="text-sm text-gray-500">
                This action cannot be undone.
              </p>

            </div>

          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-2 transition hover:bg-gray-100"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="px-6 py-6">

          <div className="flex gap-4">

            <img
              src={publication.cover_image || "https://placehold.co/80x120?text=Book"}
              alt={publication.title}
              className="h-28 w-20 rounded-lg border object-cover"
              onError={(e) => {
                e.currentTarget.src =
                  "https://placehold.co/80x120?text=Book";
              }}
            />

            <div className="flex-1">

              <h3 className="text-lg font-semibold text-[#003366]">
                {publication.title}
              </h3>

              <p className="mt-2 text-gray-600">
                <strong>Category:</strong>{" "}
                {publication.categories?.map((c) => c.name).join(", ") || "-"}
              </p>

              <p className="text-gray-600">
                <strong>Type:</strong>{" "}
                {publication.publication_type?.name || "-"}
              </p>

              <p className="text-gray-600">
                <strong>Status:</strong>{" "}
                {publication.is_active ? "Published" : "Draft"}
              </p>

            </div>

          </div>

          <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 p-4">

            <p className="text-sm text-red-700">

              You are about to permanently delete

              <span className="font-semibold">
                {" "}
                "{publication.title}"
              </span>

              . This publication and all associated information will be permanently removed.

            </p>

          </div>

        </div>

        {/* Footer */}

        <div className="flex flex-col-reverse gap-3 border-t px-6 py-5 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Cancel
          </button>

          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 rounded-xl bg-red-600 px-6 py-3 font-medium text-white transition hover:bg-red-700"
          >
            <Trash2 size={18} />

            Delete Publication

          </button>

        </div>

      </div>

    </div>
  );
}