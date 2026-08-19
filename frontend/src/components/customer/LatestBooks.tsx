import { Link } from "react-router-dom";
import {
  CalendarDays,
  Download,
  BookOpen,
} from "lucide-react";
import { useEffect, useState } from "react";

import { publicationService } from "../../services/publicationService";
import type { Publication } from "../../types/publication";

export default function LatestBooks() {
  const [books, setBooks] = useState<Publication[]>([]);

  useEffect(() => {
    async function loadBooks() {
      try {
        const data = await publicationService.getBooks();
        setBooks(data);
      } catch (error) {
        console.error("Failed to load books:", error);
      }
    }

    loadBooks();
  }, []);

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

        {/* Cards */}
        <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {books.map((book) => {
            const year = book.publication_date
              ? new Date(book.publication_date).getFullYear()
              : "N/A";

            const category =
              book.categories?.[0]?.name ?? "General";

            return (
              <div
                key={book.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Cover Image */}
                <Link
                  to={`/customer/book/${book.id}`}
                  className="relative block overflow-hidden bg-gray-100"
                >
                  <img
                    src={
                      book.cover_image || "/DefaultBook.jpg"
                    }
                    alt={book.title}
                    className="h-80 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  <span className="absolute left-4 top-4 rounded-full bg-blue-100 px-3 py-1 text-xs font-bold text-blue-700">
                    Book
                  </span>

                  <span className="absolute right-4 top-4 rounded-full bg-[#003366] px-3 py-1 text-xs font-bold text-white">
                    {year}
                  </span>
                </Link>

                {/* Card Body */}
                <div className="flex flex-1 flex-col p-6">
                  {/* Title */}
                  <Link
                    to={`/customer/book/${book.id}`}
                    className="line-clamp-2 text-xl font-bold text-[#003366] transition-all duration-200 hover:text-blue-700 hover:underline"
                  >
                    {book.title}
                  </Link>

                  {/* Author */}
                  <p className="mt-2 text-gray-500">
                    {book.author || "Unknown Author"}
                  </p>

                  {/* Meta */}
                  <div className="mt-5 space-y-3">
                    <div className="flex items-center gap-2 text-gray-600">
                      <BookOpen size={18} />
                      <span>{category}</span>
                    </div>

                    <div className="flex items-center gap-2 text-gray-600">
                      <CalendarDays size={18} />
                      <span>{year}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-6 line-clamp-3 text-sm text-gray-600">
                    {book.description ||
                      "No description available."}
                  </p>

                  {/* Download */}
                  <div className="mt-auto pt-8">
                    <button
                      type="button"
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#003366] py-3 font-semibold text-white transition hover:bg-[#002855]"
                    >
                      <Download size={18} />
                      Download
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}