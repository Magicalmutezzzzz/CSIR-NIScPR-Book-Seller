import { Link } from "react-router-dom";
import {
  CalendarDays,
  Download,
  BookOpen,
  Eye,
} from "lucide-react";
import { publicationService } from "../../services/publicationService";

import { useEffect, useState } from "react";
import type { Publication } from "../../types/publication";

export default function LatestBooks() {

  const [books, setBooks] = useState<Publication[]>([]);

  useEffect(() => {
    loadBooks();
  }, []);

  async function loadBooks() {
    const data = await publicationService.getBooks();
    setBooks(data);
  }

  return (
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h2 className="text-4xl font-bold text-[#003366]">
              Latest Books
            </h2>

            <p className="mt-3 max-w-2xl text-lg text-gray-600">
              Browse recently published books from CSIR–NIScPR.
            </p>
          </div>

          <Link
            to="/customer/books"
            className="rounded-xl bg-[#003366] px-6 py-3 font-semibold text-white transition hover:bg-[#002855]"
          >
            View All Books
          </Link>
        </div>

        {/* Book Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {books.map((book) => (

            <div
              key={book.id}
              className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >

              {/* Image */}
              <div className="relative overflow-hidden bg-gray-100">

                <img
                  src={book.cover_image || "/DefaultBook.jpg"}
                  alt={book.title}
                  className="h-80 w-full object-cover transition duration-500 group-hover:scale-105"
                />

                <span className="absolute left-4 top-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                  Book
                </span>

                <span className="absolute right-4 top-4 rounded-full bg-[#003366] px-3 py-1 text-xs font-bold text-white">
                  {book.year}
                </span>

              </div>

              {/* Body */}
              <div className="p-6">

                <h3 className="line-clamp-2 text-xl font-bold text-[#003366]">
                  {book.title}
                </h3>

                <p className="mt-2 text-gray-500">
                  {book.author}
                </p>

                <div className="mt-5 space-y-3">

                  <div className="flex items-center gap-2 text-gray-600">
                    <BookOpen size={18} />
                    <span>{book.category}</span>
                  </div>

                  <div className="flex items-center gap-2 text-gray-600">
                    <CalendarDays size={18} />
                    <span>{book.year}</span>
                  </div>

                </div>

                <div className="mt-6 line-clamp-3 text-sm text-gray-600">
                  {book.description}
                </div>

                <div className="mt-8 flex gap-3">

                  <Link
                    to={`/customer/books/${book.id}`}
                    className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#003366] py-3 font-semibold text-[#003366] transition hover:bg-[#003366] hover:text-white"
                  >
                    <Eye size={18} />
                    View Details
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