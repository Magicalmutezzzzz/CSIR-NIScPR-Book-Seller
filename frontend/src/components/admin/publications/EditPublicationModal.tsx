import { useEffect } from "react";
import { X, Save, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Publication } from "./PublicationTable";

const publicationSchema = z.object({
  id: z.number(),

  image: z.string(),

  title: z
    .string()
    .min(3, "Title must be at least 3 characters"),

  type: z.string(),

  category: z.string(),

  price: z
    .number()
    .min(0),

  stock: z
    .number()
    .min(0),

  sold: z
    .number()
    .min(0),

  revenue: z
    .number()
    .min(0),

  status: z.enum([
    "Draft",
    "Pending Review",
    "Published",
    "Archived",
  ]),

  created: z.string(),
});

type PublicationFormData =
  z.infer<typeof publicationSchema>;

interface EditPublicationModalProps {
  open: boolean;

  publication: Publication | null;

  onClose: () => void;

  onSave: (
    publication: PublicationFormData
  ) => void;
}

export default function EditPublicationModal({
  open,
  publication,
  onClose,
  onSave,
}: EditPublicationModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PublicationFormData>({
    resolver: zodResolver(
      publicationSchema
    ),
  });

  useEffect(() => {
    if (publication) {
      reset(publication);
    }
  }, [publication, reset]);

  if (!open || !publication) return null;

  const submitForm = (
    data: PublicationFormData
  ) => {
    onSave(data);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-5">

      <div className="max-h-[92vh] w-full max-w-6xl overflow-y-auto rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="sticky top-0 flex items-center justify-between border-b bg-white px-8 py-6">

          <div>

            <h2 className="text-2xl font-bold text-[#003366]">
              Edit Publication
            </h2>

            <p className="mt-1 text-gray-500">
              Update publication details
            </p>

          </div>

          <button
            onClick={onClose}
            className="rounded-xl p-2 transition hover:bg-gray-100"
          >
            <X size={24} />
          </button>

        </div>

        <form
          onSubmit={handleSubmit(submitForm)}
          className="space-y-8 p-8"
        >

          {/* Basic Information */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Basic Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Title
                </label>

                <input
                  {...register("title")}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

                {errors.title && (

                  <p className="mt-2 text-sm text-red-600">
                    {errors.title.message}
                  </p>

                )}

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Category
                </label>

                <input
                  {...register("category")}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>
                          <div>

                <label className="mb-2 block font-medium">
                  Publication Type
                </label>

                <select
                  {...register("type")}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                >
                  <option value="Book">Book</option>
                  <option value="Journal">Journal</option>
                  <option value="Magazine">Magazine</option>
                  <option value="Research Article">
                    Research Article
                  </option>
                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Status
                </label>

                <select
                  {...register("status")}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                >
                  <option value="Draft">
                    Draft
                  </option>

                  <option value="Pending Review">
                    Pending Review
                  </option>

                  <option value="Published">
                    Published
                  </option>

                  <option value="Archived">
                    Archived
                  </option>

                </select>

              </div>

            </div>

          </div>

          {/* Pricing & Inventory */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Pricing & Inventory
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Price (₹)
                </label>

                <input
                  type="number"
                  step="0.01"
                  {...register("price", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

                {errors.price && (

                  <p className="mt-2 text-sm text-red-600">
                    {errors.price.message}
                  </p>

                )}

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Stock
                </label>

                <input
                  type="number"
                  {...register("stock", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Sold
                </label>

                <input
                  type="number"
                  {...register("sold", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Revenue (₹)
                </label>

                <input
                  type="number"
                  step="0.01"
                  {...register("revenue", {
                    valueAsNumber: true,
                  })}
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

            </div>

          </div>

          {/* Description */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-5 text-xl font-semibold text-[#003366]">
              Description
            </h3>

            <textarea
              rows={6}
              placeholder="Enter publication description..."
              className="w-full resize-none rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
            />

          </div>

          {/* Cover Image */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Cover Image
            </h3>

            <div className="grid gap-8 lg:grid-cols-2">

              <div className="flex justify-center">

                <img
                  src={publication.image}
                  alt={publication.title}
                  className="w-64 rounded-2xl border shadow-lg object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/300x420?text=No+Image";
                  }}
                />

              </div>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-10 transition hover:border-[#003366] hover:bg-blue-50">

                <Upload
                  size={42}
                  className="mb-4 text-[#003366]"
                />

                <span className="font-semibold text-[#003366]">
                  Upload New Cover
                </span>

                <span className="mt-2 text-sm text-gray-500">
                  JPG, PNG, WEBP
                </span>

                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                />

              </label>

            </div>

          </div>

                  {/* Gallery Images */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Gallery Images
            </h3>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">

              {[1, 2, 3, 4].map((item) => (

                <div
                  key={item}
                  className="overflow-hidden rounded-2xl border bg-gray-50"
                >

                  <img
                    src={publication.image}
                    alt={`Gallery ${item}`}
                    className="aspect-[3/4] w-full object-cover"
                  />

                </div>

              ))}

              <label className="flex aspect-[3/4] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 transition hover:border-[#003366] hover:bg-blue-50">

                <Upload
                  size={32}
                  className="mb-3 text-[#003366]"
                />

                <span className="font-medium">
                  Add Images
                </span>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                />

              </label>

            </div>

          </div>

          {/* PDF Upload */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Publication PDF
            </h3>

            <label className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-10 transition hover:border-[#003366] hover:bg-blue-50">

              <Upload
                size={42}
                className="mb-4 text-[#003366]"
              />

              <p className="font-semibold text-[#003366]">
                Upload PDF
              </p>

              <p className="mt-2 text-sm text-gray-500">
                PDF up to 50 MB
              </p>

              <input
                type="file"
                accept=".pdf"
                className="hidden"
              />

            </label>

          </div>

          {/* SEO */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              SEO Information
            </h3>

            <div className="space-y-5">

              <div>

                <label className="mb-2 block font-medium">
                  Meta Title
                </label>

                <input
                  type="text"
                  placeholder="Enter meta title"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Meta Description
                </label>

                <textarea
                  rows={4}
                  placeholder="Enter meta description"
                  className="w-full resize-none rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

            </div>

          </div>

          {/* Additional Information */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Additional Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Author
                </label>

                <input
                  type="text"
                  placeholder="Author Name"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  ISBN
                </label>

                <input
                  type="text"
                  placeholder="ISBN"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Publisher
                </label>

                <input
                  type="text"
                  placeholder="Publisher"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Language
                </label>

                <input
                  type="text"
                  placeholder="English"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Edition
                </label>

                <input
                  type="text"
                  placeholder="First Edition"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Number of Pages
                </label>

                <input
                  type="number"
                  placeholder="250"
                  className="w-full rounded-xl border px-4 py-3 focus:border-[#003366] focus:outline-none"
                />

              </div>

            </div>

          </div>

                    {/* Publication Settings */}

          <div className="rounded-2xl border p-6">

            <h3 className="mb-6 text-xl font-semibold text-[#003366]">
              Publication Settings
            </h3>

            <div className="space-y-4">

              <label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

                <div>

                  <p className="font-semibold text-gray-800">
                    Featured Publication
                  </p>

                  <p className="text-sm text-gray-500">
                    Display this publication in the featured section.
                  </p>

                </div>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#003366]"
                />

              </label>

              <label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

                <div>

                  <p className="font-semibold text-gray-800">
                    Show on Homepage
                  </p>

                  <p className="text-sm text-gray-500">
                    Display this publication on the homepage.
                  </p>

                </div>

                <input
                  type="checkbox"
                  className="h-5 w-5 accent-[#003366]"
                />

              </label>

              <label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

                <div>

                  <p className="font-semibold text-gray-800">
                    Allow Purchase
                  </p>

                  <p className="text-sm text-gray-500">
                    Customers can purchase this publication.
                  </p>

                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-[#003366]"
                />

              </label>

              <label className="flex items-center justify-between rounded-xl border p-4 hover:bg-gray-50">

                <div>

                  <p className="font-semibold text-gray-800">
                    Visible on Website
                  </p>

                  <p className="text-sm text-gray-500">
                    Make this publication publicly visible.
                  </p>

                </div>

                <input
                  type="checkbox"
                  defaultChecked
                  className="h-5 w-5 accent-[#003366]"
                />

              </label>

            </div>

          </div>

          {/* Footer */}

          <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t bg-white pt-6 sm:flex-row sm:justify-end">

            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-gray-300 px-6 py-3 font-medium transition hover:bg-gray-100"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-[#003366] px-6 py-3 font-medium text-white transition hover:bg-[#002855]"
            >
              <Save size={18} />

              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}
