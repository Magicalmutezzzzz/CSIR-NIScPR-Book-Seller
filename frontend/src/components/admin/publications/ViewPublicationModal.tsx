import {
  X,
  Calendar,
  Tag,
  Package,
  IndianRupee,
  FileText,
  Image as ImageIcon,
  ExternalLink,
} from "lucide-react";
import PublicationStatusBadge from "./PublicationStatusBadge";
import type { Publication } from "../../../types/publication";
interface ViewPublicationModalProps {
  open: boolean;
  publication: Publication | null;
  onClose: () => void;
}

const formatCurrency = (value: string | number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value));

export default function ViewPublicationModal({
  open,
  publication,
  onClose,
}: ViewPublicationModalProps) {
  if (!open || !publication) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">

      <div className="relative w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-[#003366]">
              Publication Details
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Complete information about this publication
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        {/* Body */}

        <div className="p-8 space-y-8">

          {/* Top Section */}

          <div className="grid gap-8 lg:grid-cols-3">

            {/* Cover */}

            <div className="flex justify-center">

              <img
                src={(publication.cover_image || "N/A")}
                alt={publication.title}
                className="w-72 rounded-2xl border object-cover shadow-lg"
                onError={(e) => {
                  e.currentTarget.src =
                    "https://placehold.co/300x420?text=No+Image";
                }}
              />

            </div>

            {/* Details */}

            <div className="lg:col-span-2 space-y-6">

              <div className="flex flex-wrap items-center gap-4">

                <h1 className="text-3xl font-bold text-[#003366]">
                  {publication.title}
                </h1>

                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    publication.is_active
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {publication.is_active ? "Active" : "Inactive"}
                </span>

              </div>

              <div className="grid gap-4 md:grid-cols-2">

                <div className="rounded-2xl border p-5">

                  <div className="mb-2 flex items-center gap-2 text-[#003366] font-semibold">

                    <Tag size={18} />

                    Category

                  </div>

                  <p className="text-gray-700">
                    {publication.categories?.map(c => c.name).join(", ") || "-"}
                  </p>

                </div>

                <div className="rounded-2xl border p-5">

                  <div className="mb-2 flex items-center gap-2 text-[#003366] font-semibold">

                    <FileText size={18} />

                    Type

                  </div>

                  <p className="text-gray-700">
                    {publication.publication_type_id}
                  </p>

                </div>

                <div className="rounded-2xl border p-5">

                  <div className="mb-2 flex items-center gap-2 text-[#003366] font-semibold">

                    <IndianRupee size={18} />

                    Price

                  </div>

                  <p className="text-2xl font-bold text-green-700">
                    {formatCurrency(publication.price)}
                  </p>

                </div>

                <div className="rounded-2xl border p-5">

                  <div className="mb-2 flex items-center gap-2 text-[#003366] font-semibold">

                    <Package size={18} />

                    Stock

                  </div>

                  <p className="text-2xl font-bold text-blue-700">
                    {publication.stock}
                  </p>

                </div>

                <div className="rounded-2xl border p-5">

                  <div className="mb-2 flex items-center gap-2 text-[#003366] font-semibold">

                    <Package size={18} />

                    Sold

                  </div>

                  <p className="text-2xl font-bold">
                    {0}
                  </p>

                </div>

                <div className="rounded-2xl border p-5">

                  <div className="mb-2 flex items-center gap-2 text-[#003366] font-semibold">

                    <IndianRupee size={18} />

                    Revenue

                  </div>

                  <p className="text-2xl font-bold text-green-700">
                    {"-"}
                  </p>

                </div>

              </div>

              <div className="rounded-2xl border p-5">

                <div className="mb-3 flex items-center gap-2 font-semibold text-[#003366]">

                  <Calendar size={18} />

                  Created

                </div>

                <p className="text-gray-700">
                  {publication.publication_date || "-"}
                </p>

              </div>
                            {/* Description */}

              <div className="rounded-2xl border p-6">

                <h3 className="mb-4 text-lg font-semibold text-[#003366]">
                  Description
                </h3>

                <p className="leading-7 text-gray-700">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Replace this with the publication description from your
                  backend once FastAPI integration is complete.
                </p>

              </div>

              {/* Publication Information */}

              <div className="grid gap-5 md:grid-cols-2">

                <div className="rounded-2xl border p-5">

                  <h3 className="mb-4 font-semibold text-[#003366]">
                    Publication Information
                  </h3>

                  <div className="space-y-3 text-sm">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Publication ID
                      </span>

                      <span className="font-medium">
                        #{publication.id}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Category
                      </span>

                      <span className="font-medium">
                        {publication.categories?.map((c) => c.name).join(", ") || "-"}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Type
                      </span>

                      <span className="font-medium">
                        {publication.publication_type_id}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Status
                      </span>

                      <PublicationStatusBadge
                        status={publication.is_active ? "Published" : "Draft"}
                      />

                    </div>

                  </div>

                </div>

                <div className="rounded-2xl border p-5">

                  <h3 className="mb-4 font-semibold text-[#003366]">
                    Inventory
                  </h3>

                  <div className="space-y-3 text-sm">

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Stock
                      </span>

                      <span className="font-semibold">
                        {publication.stock}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Sold
                      </span>

                      <span className="font-semibold">
                        {0}
                      </span>

                    </div>

                    <div className="flex justify-between">

                      <span className="text-gray-500">
                        Revenue
                      </span>

                      <span className="font-semibold text-green-700">
                        {"-"}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Gallery */}

              <div className="rounded-2xl border p-6">

                <div className="mb-5 flex items-center gap-2">

                  <ImageIcon
                    size={20}
                    className="text-[#003366]"
                  />

                  <h3 className="text-lg font-semibold text-[#003366]">
                    Gallery
                  </h3>

                </div>

                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

                  {[1, 2, 3, 4].map((item) => (

                    <img
                      key={item}
                      src={publication.cover_image || "https://placehold.co/300x420?text=No+Image"}
                      alt={`Gallery ${item}`}
                      className="aspect-[3/4] rounded-xl border object-cover"
                    />

                  ))}

                </div>

              </div>

              {/* Attached PDF */}

              <div className="rounded-2xl border p-6">

                <div className="flex items-center justify-between">

                  <div>

                    <h3 className="text-lg font-semibold text-[#003366]">
                      Attached PDF
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Preview or download publication document
                    </p>

                  </div>

                  <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 py-3 text-white transition hover:bg-[#00264d]">

                    <ExternalLink size={18} />

                    Open PDF

                  </button>

                </div>

              </div>

              {/* SEO */}

              <div className="rounded-2xl border p-6">

                <h3 className="mb-5 text-lg font-semibold text-[#003366]">
                  SEO Information
                </h3>

                <div className="space-y-4">

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Meta Title
                    </label>

                    <div className="rounded-xl border bg-gray-50 p-3">
                      {publication.title}
                    </div>

                  </div>

                  <div>

                    <label className="mb-2 block text-sm font-medium">
                      Meta Description
                    </label>

                    <div className="rounded-xl border bg-gray-50 p-3 text-gray-700">
                      SEO description will appear here after backend
                      integration.
                    </div>

                  </div>

                </div>

              </div>
                            {/* Metadata */}

              <div className="rounded-2xl border p-6">

                <h3 className="mb-5 text-lg font-semibold text-[#003366]">
                  Metadata
                </h3>

                <div className="grid gap-5 md:grid-cols-2">

                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">
                      Publication ID
                    </p>

                    <p className="mt-1 font-semibold">
                      #{publication.id}
                    </p>

                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">
                      Created On
                    </p>

                    <p className="mt-1 font-semibold">
                      {publication.publication_date || "-"}
                    </p>

                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">
                      Current Status
                    </p>

                    <div className="mt-2">

                      <PublicationStatusBadge
                        status={publication.is_active ? "Published" : "Draft"}
                      />

                    </div>

                  </div>

                  <div className="rounded-xl bg-gray-50 p-4">

                    <p className="text-sm text-gray-500">
                      Publication Type
                    </p>

                    <p className="mt-1 font-semibold">
                      {publication.publication_type_id}
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

        {/* Footer */}

        <div className="sticky bottom-0 flex flex-col gap-3 border-t bg-white px-8 py-5 sm:flex-row sm:justify-end">

          <button
            onClick={onClose}
            className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
          >
            Close
          </button>

          <button
            className="rounded-xl bg-[#003366] px-6 py-3 font-medium text-white transition hover:bg-[#002855]"
          >
            Edit Publication
          </button>

        </div>

      </div>

    </div>

  );
}