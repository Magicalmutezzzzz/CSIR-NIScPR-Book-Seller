import { useParams, Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  ArrowLeft,
  BookOpen,
  Globe,
  Calendar,
  FileText,
  Boxes,
  IndianRupee,
} from "lucide-react";
import { publicationService } from "../../services/publicationService";

export default function BookDetails() {
  const { id } = useParams();

  const publication = publicationService.getById(Number(id));

  if (!publication) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="rounded-2xl bg-white p-10 shadow-lg text-center">
          <h1 className="text-3xl font-bold text-[#003366]">
            Publication Not Found
          </h1>

          <p className="mt-3 text-gray-600">
            The publication you are looking for doesn't exist.
          </p>

          <Link
            to="/customer/books"
            className="mt-6 inline-flex rounded-xl bg-[#003366] px-6 py-3 text-white hover:bg-[#002855]"
          >
            Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Breadcrumb */}

      <div className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-6 py-4">
          <Link
            to="/customer/books"
            className="flex items-center gap-2 text-[#003366] hover:underline"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>
      </div>

      {/* Main */}

      <div className="mx-auto max-w-7xl px-6 py-12">

        <div className="grid gap-12 lg:grid-cols-2">

          {/* LEFT */}

          <div>

            <div className="overflow-hidden rounded-3xl bg-white shadow-lg">

              <img
                src={publication.coverImage}
                alt={publication.title}
                className="h-[650px] w-full object-cover"
              />

            </div>

          </div>

          {/* RIGHT */}

          <div>

            <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-[#003366]">
              {publication.type}
            </span>

            <h1 className="mt-5 text-5xl font-bold text-[#003366]">
              {publication.title}
            </h1>

            <p className="mt-3 text-xl text-gray-600">
              {publication.author}
            </p>

            <div className="mt-8 rounded-2xl bg-white p-6 shadow">

              <h2 className="text-2xl font-bold text-[#003366]">
                Description
              </h2>

              <p className="mt-4 leading-8 text-gray-700">
                {publication.description}
              </p>

            </div>

            {/* Price */}

            <div className="mt-8 flex items-center gap-3">

              <IndianRupee className="text-green-600" />

              <span className="text-4xl font-bold text-green-600">
                {publication.price}
              </span>

            </div>

            {/* Info */}

            <div className="mt-10 grid gap-5 sm:grid-cols-2">

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
                <BookOpen className="text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">Category</p>
                  <p className="font-semibold">{publication.category}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
                <Calendar className="text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">Published</p>
                  <p className="font-semibold">{publication.year}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
                <Globe className="text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">Language</p>
                  <p className="font-semibold">{publication.language}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
                <FileText className="text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">Pages</p>
                  <p className="font-semibold">{publication.pages}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
                <Boxes className="text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">Stock</p>
                  <p className="font-semibold">
                    {publication.stock} Available
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl bg-white p-4 shadow">
                <BookOpen className="text-[#003366]" />
                <div>
                  <p className="text-sm text-gray-500">ISBN</p>
                  <p className="font-semibold">
                    {publication.isbn || "N/A"}
                  </p>
                </div>
              </div>

            </div>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">

              <button className="flex flex-1 items-center justify-center gap-3 rounded-2xl bg-[#003366] py-4 text-lg font-semibold text-white transition hover:bg-[#002855]">
                <ShoppingCart />
                Add to Cart
              </button>

              <button className="rounded-2xl border border-[#003366] px-8 text-[#003366] transition hover:bg-[#003366] hover:text-white">
                Buy Now
              </button>

              <button className="rounded-2xl border p-4 transition hover:bg-red-50">
                <Heart />
              </button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}