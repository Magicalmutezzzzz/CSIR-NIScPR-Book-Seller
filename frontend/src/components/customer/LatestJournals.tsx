import { Link } from "react-router-dom";
import {
  CalendarDays,
  Download,
  BookOpen,
  Eye,
} from "lucide-react";
import { publicationService } from "../../services/publicationService";

export default function LatestJournals() {
  const journals = publicationService.getJournals();

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">

          <div>
            <h2 className="text-4xl font-bold text-[#003366]">
              Latest Journals
            </h2>

            <p className="mt-3 text-lg text-gray-600 max-w-2xl">
              Browse recently published peer-reviewed scientific journals from
              CSIR–NIScPR.
            </p>
          </div>

          <Link
            to="/customer/journals"
            className="rounded-xl bg-[#003366] px-6 py-3 font-semibold text-white transition hover:bg-[#002855]"
          >
            View All Journals
          </Link>

        </div>

        {/* Journal Cards */}

        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {journals.map((journal) => (

            <div
              key={journal.id}
              className="group overflow-hidden rounded-3xl bg-white border border-gray-200 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}

              <div className="relative overflow-hidden bg-gray-100">

                <img
                  src={journal.coverImage}
                  alt={journal.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                  Peer Reviewed
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-[#003366] px-3 py-1 text-xs font-bold text-white">
                  {journal.year}
                </span>

              </div>

              {/* Body */}

              <div className="p-6">

                <h3 className="line-clamp-2 text-xl font-bold text-[#003366]">
                  {journal.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  {journal.author}
                </p>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen size={18} />
                    <span>{journal.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays size={18} />
                    <span>{journal.year}</span>
                  </div>

                </div>

                <div className="mt-6 line-clamp-3 text-sm text-gray-600">
                  {journal.description}
                </div>

                <div className="mt-8 flex gap-3">

                  <Link
                    to={`/customer/book/${journal.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#003366] py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                  >
                    <Eye size={18} />
                    Read
                  </Link>

                  <button className="flex items-center gap-2 rounded-xl bg-[#003366] px-5 text-white transition hover:bg-[#002855]">
                    <Download size={18} />
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}